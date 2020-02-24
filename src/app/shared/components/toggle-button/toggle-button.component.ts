import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent implements OnInit {

  @Output()
  public toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public initialValue: boolean;

  @Input()
  public text: string;

  public toggleId: string;
  public isToggled = false;

  constructor() { }

  ngOnInit() {
    this.toggleId = Math.random().toString(36).substr(2, 12);
    if (this.initialValue) {
      this.isToggled = this.initialValue;
    }
  }

  public handleToggleCheck(event): void {
    this.toggleEvent.emit(event.target.checked);
  }

}
