import { isMobile } from './../../util';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface NumberSelectConfig {
  rows: SelectRow[];
  max: number;
  min: number;
  default: any;
}

interface SelectRow {
  single: string;
  multiple: string;
  id?: string;
}

@Component({
  selector: 'app-number-select',
  templateUrl: './number-select.component.html',
  styleUrls: ['./number-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumberSelectComponent implements OnInit {

  @Input() parentControl: FormControl;
  @Input() config: NumberSelectConfig;

  public isSelectOpen = false;
  public canIncrease = false;
  public canDecrease = false;
  public selectValues = {};
  public mappedConfig;
  public isMobile = isMobile;

  constructor() { }

  public ngOnInit(): void {
    this.initComp();
    this.prefillComp();
  }

  private initComp(): void {
    this.config.rows.map(row => {
      row.id = Math.random().toString(36).substr(2, 9);
      this.selectValues[row.id] = 0;
    });
    this.mappedConfig = this.config.rows;
  }

  private prefillComp(): void {
    this.selectValues[Object.keys(this.selectValues)[0]] = this.parentControl.value.adult;
    this.selectValues[Object.keys(this.selectValues)[1]] = this.parentControl.value.kid;
    const total = this.parentControl.value.kid + this.parentControl.value.adult;
    this.parentControl.patchValue({...this.parentControl.value, total});
  }

  public increase(id: string): void {
    const selectVal = this.selectValues[id];
    const currVal = this.parentControl.value.total;

    if (currVal < this.config.max) {
      this.setNewValue(true, currVal, id, selectVal);
    }
  }

  public decrease(id: string): void {
    const selectVal = this.selectValues[id];
    const currVal = this.parentControl.value.total;
    if (currVal > this.config.min) {
      this.setNewValue(false, currVal, id, selectVal);
    }
  }

  public setNewValue(add: boolean, currVal: any, id: string, selectVal: any): void {
    const newVal = add ? currVal + 1 : currVal - 1;
    const index = Object.keys(this.selectValues).indexOf(id);
    const newSelectVal = (add ? selectVal + 1 :  selectVal - 1);

    if (index === 0) {
      this.parentControl.patchValue({...this.parentControl.value, adult: newSelectVal});
    } else {
      this.parentControl.patchValue({...this.parentControl.value, kid: newSelectVal});
    }

    this.parentControl.patchValue({...this.parentControl.value, total: newVal});
    this.selectValues[id] = newSelectVal;
  }

  public getText(single: string, multiple: string, val: number): string {
    return val === 1 ? `${val} ${single}` : `${val} ${multiple}`;
  }

  public canDisable(increase): boolean {
    const controlVal = this.parentControl.value;
    if (increase) {
      return controlVal === this.config.max;
    } else {
      return controlVal <= this.config.min;
    }
  }
}
