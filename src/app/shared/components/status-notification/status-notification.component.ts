import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-notification',
  templateUrl: './status-notification.component.html',
  styleUrls: ['./status-notification.component.scss']
})
export class StatusNotificationComponent {

  @Input() text = 'Aktion war erfolgreich.';
  @Input() type: 'error' | 'success' | 'warning' = 'success';

  constructor() { }

  public getStatusClass(): string {
    return 'status-notification--' + this.type;
  }
}
