import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDetailsCostComponent } from './result-details-cost.component';

describe('ResultDetailsCostComponent', () => {
  let component: ResultDetailsCostComponent;
  let fixture: ComponentFixture<ResultDetailsCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDetailsCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDetailsCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
