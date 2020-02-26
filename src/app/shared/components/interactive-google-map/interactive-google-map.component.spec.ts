import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveGoogleMapComponent } from './interactive-google-map.component';

describe('InteractiveGoogleMapComponent', () => {
  let component: InteractiveGoogleMapComponent;
  let fixture: ComponentFixture<InteractiveGoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveGoogleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
