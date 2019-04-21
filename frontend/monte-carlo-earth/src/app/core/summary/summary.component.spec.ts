import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import CountoModule from 'angular2-counto';
import { Observable } from 'rxjs';
import { SummaryViewModel } from 'src/app/model';
import { PointService } from '../pointService/point.service';

//#region Mock definitions
class PointServiceMock {
  getPointsSummary() {
    return Observable.of<SummaryViewModel>({
      allCount: 30,
      waterCount: 21
    });
  }
}
//#endregion

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CountoModule ],
      declarations: [ SummaryComponent ],
      providers: [
        { provide: PointService, useClass: PointServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return ratio as 0 when no data has been provided yet', () => {
    // zero-out data to simulate state before it's filled with server response
    component.allPointsCount = 0;
    component.waterPointsCount = 0;

    expect(component.ratio).toBe(0);
  });

  it('should calculate ratio when data has been provided', () => {
    component.allPointsCount = 10;
    component.waterPointsCount = 6;
    fixture.detectChanges();
    expect(component.ratio).toBe(0.6);
  });
});
