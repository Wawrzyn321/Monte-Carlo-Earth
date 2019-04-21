import { TestBed, getTestBed } from '@angular/core/testing';

import { GeocodingService } from './geocoding.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../apiConfig';
import { Point } from 'src/app/model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const apiConfig = {
  geocodingUrl: 'geocodingUrl',
  pointsUrl: 'pointsUrl'
};

describe('GeocodingService', () => {
  let service: GeocodingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        GeocodingService,
        HttpClient,
        { provide: API_CONFIG, useValue: apiConfig}
      ]
    });
    const testBed: TestBed = getTestBed();
    service = testBed.get(GeocodingService);
    httpMock = testBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns Observable<String> from getLocation method', () => {
    const dummyPoint: Point = { latitude: 10, longitude: 20, isOnWater: false, location: null };

    service.getLocation(dummyPoint).subscribe(responseLocation => {
      expect(responseLocation).toBe('location');
    });

    const req = httpMock.expectOne(apiConfig.geocodingUrl);
    expect(req.request.method).toBe('GET');
    req.flush('location');
  });
});
