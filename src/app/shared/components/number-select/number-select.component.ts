import { isMobile } from './../../util';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface NumberSelectConfig {
  rows: SelectRow[];
  max: number;
  min: number;
  default: number;
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
    this.config.rows.map(row => {
      row.id = Math.random().toString(36).substr(2, 9);
      this.selectValues[row.id] = 0;
    });
    // Prefill 1 Adult
    this.selectValues[Object.keys(this.selectValues)[0]] = this.config.default;
    this.mappedConfig = this.config.rows;
  }

  public increase(id: string): void {
    const selectVal = this.selectValues[id];
    const currVal = this.parentControl.value;

    if (currVal < this.config.max) {
      const newVal = currVal + 1;
      this.parentControl.patchValue(newVal);
      this.selectValues[id] = selectVal + 1;
    }
  }

  public decrease(id: string): void {
    const selectVal = this.selectValues[id];
    const currVal = this.parentControl.value;
    if (currVal > this.config.min) {
      const newVal = currVal - 1;
      this.parentControl.patchValue(newVal);
      this.selectValues[id] = selectVal - 1;
    }
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
