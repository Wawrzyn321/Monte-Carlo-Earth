import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointComponent } from './add-point.component';
import { Component, Input } from '@angular/core';
import { Point, SummaryViewModel } from 'src/app/model';
import { PointService } from '../pointService/point.service';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SummaryUpdateService } from '../summaryUpdateService/summary-update.service';

//#region Mock definitions
@Component({
  selector: 'app-point-info',
  template: '<span>Mocked app point info</span>'
})
// tslint:disable-next-line:component-class-suffix
class PointInfoComponentMock {
  @Input() point: Point;
}

class PointServiceMock {
  getPointsSummary() {
    return Observable.of<SummaryViewModel>({
      allCount: 3,
      waterCount: 2
    });
  }

  addPoint() {
    return Observable.of<Point>({
      latitude: 10,
      longitude: 20,
      isOnWater: false,
      location: null
    });
  }
}

class SummaryUpdateServiceMock {
  emitIncrementEvent(point: Point) { }
}
//#endregion

describe('AddPointComponent', () => {
  let component: AddPointComponent;
  let fixture: ComponentFixture<AddPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddPointComponent,
        PointInfoComponentMock
      ],
      providers: [
        { provide: PointService, useClass: PointServiceMock },
        { provide: SummaryUpdateService, useClass: SummaryUpdateServiceMock }
      ]
    })
    .compileComponents();
  }));

  it('initially has "Add new point" button caption', () => {
    fixture = TestBed.createComponent(AddPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('button'));
    expect(element.nativeElement.innerText).toBe('Add new point!');
  });

  it('if point had been added, has "Add another" button caption', () => {
    fixture = TestBed.createComponent(AddPointComponent);
    component = fixture.componentInstance;
    component.point = { latitude: 10, longitude: 20, isOnWater: false, location: null };
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('button'));
    expect(element.nativeElement.innerText).toBe('Add another');
  });
});
