import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { PointService } from './point.service';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../apiConfig';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SummaryViewModel, PointViewModel } from 'src/app/model';

const apiConfig = {
  pointsUrl: 'pointsUrl',
  geocodingUrl: 'geocodingUrl'
};

describe('PointService', () => {
  let service: PointService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        PointService,
        { provide: API_CONFIG, useValue: apiConfig }
      ]
    });
    const testBed: TestBed = getTestBed();
    service = testBed.get(PointService);
    httpMock = testBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns Observable<SummaryViewModel> from getPointsSummary', () => {
    const dummySummary: SummaryViewModel = {
      allCount: 8,
      waterCount: 5
    };

    service.getPointsSummary().subscribe(summary => {
      // this time don't use toEqual
      expect(summary).toBeDefined();
      expect(summary.allCount).toBe(8);
      expect(summary.waterCount).toBe(5);
    });

    const req = httpMock.expectOne(apiConfig.pointsUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummySummary);
  });

  it('returns Observable<PointViewModel> from getPointsSummary', () => {
    const dummyPointVM: PointViewModel = {
      isWater: true,
      latitude: 10,
      longitude: 20
    };

    service.addPoint().subscribe(pointVm => {
      // this time just use toEqual
      expect(pointVm).toEqual(dummyPointVM);
    });

    const req = httpMock.expectOne(apiConfig.pointsUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyPointVM);
  });

});
