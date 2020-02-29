// tslint:disable: variable-name
import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Litepicker from 'litepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-litepicker',
  templateUrl: './litepicker.component.html',
  styleUrls: ['./litepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LitepickerComponent implements OnInit, AfterViewInit {

  @Input() parentControl: FormControl;

  @ViewChild('litepicker', { read: ElementRef, static: true }) pickerRef: ElementRef;

  private picker: any;

  constructor() {
    moment.locale('de');
  }

  public ngOnInit(): void {
    this.setDateValue(moment(), moment().add(6, 'days'));
  }

  public ngAfterViewInit(): void {
    const _Litepicker: any = Litepicker;
    this.picker = new _Litepicker(
      {
        element: this.pickerRef.nativeElement,
        format: 'DD.MM.YYYY',
        lang: 'de-DE',
        hotelMode: true,
        splitView: true,
        singleMode: false,
        numberOfColumns: 2,
        numberOfMonths: 2,
        showWeekNumbers: true,
        disallowBookedDaysInRange: true,
        selectForward: true,
        startDate: moment(),
        endDate: moment().add(6, 'days'),
        tooltipText: {
          one: 'Nacht',
          other: 'Nächte',
        },
        onSelect: this.setDateValue.bind(this),
      });
  }

  private setDateValue(date1, date2): void {
    const dateValue = {
      start: moment(date1),
      end: moment(date2)
    };
    this.parentControl.patchValue(dateValue);
  }
}
