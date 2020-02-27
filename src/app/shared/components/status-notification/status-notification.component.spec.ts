import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNotificationComponent } from './status-notification.component';

describe('StatusNotificationComponent', () => {
  let component: StatusNotificationComponent;
  let fixture: ComponentFixture<StatusNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
