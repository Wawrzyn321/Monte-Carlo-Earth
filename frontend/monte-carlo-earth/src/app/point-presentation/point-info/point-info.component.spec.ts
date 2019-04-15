import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointInfoComponent } from './point-info.component';

describe('PointInfoComponent', () => {
  let component: PointInfoComponent;
  let fixture: ComponentFixture<PointInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
