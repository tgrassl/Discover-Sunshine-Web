import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardRowComponent } from './image-card-row.component';

describe('ImageCardRowComponent', () => {
  let component: ImageCardRowComponent;
  let fixture: ComponentFixture<ImageCardRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCardRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
