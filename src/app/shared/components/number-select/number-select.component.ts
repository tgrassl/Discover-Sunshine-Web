import { isMobile } from './../../util';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface NumberSelectConfig {
  rows: SelectRow[];
  max: number;
  min: number;
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
  public selectValues = {};
  public mappedConfig;
  public isMobile = isMobile;

  constructor() { }

  public ngOnInit(): void {
    this.config.rows.map(row => {
      row.id = Math.random().toString(36).substr(2, 9);
      this.selectValues[row.id] = 0;
    });
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
    if (currVal > 0 && selectVal > 0) {
      const newVal = currVal - 1;
      this.parentControl.patchValue(newVal);
      this.selectValues[id] = selectVal - 1;
    }
  }

  public getText(single: string, multiple: string, val: number): string {
    return val === 1 ? `${val} ${single}` : `${val} ${multiple}`;
  }
}
