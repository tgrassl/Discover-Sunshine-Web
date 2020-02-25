import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitepickerComponent } from './litepicker.component';

describe('LitepickerComponent', () => {
  let component: LitepickerComponent;
  let fixture: ComponentFixture<LitepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
