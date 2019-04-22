import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PointInfoComponent } from './point-info.component';
import { PipeTransform, Pipe } from '@angular/core';
import { CoordinateFormatterPipe } from '../coordinateFormatterPipe/coordinate-formatter.pipe';
import { CapitalizePipe } from 'src/app/shared/capitalizePipe/capitalize.pipe';
import { GeocodingService } from 'src/app/core/geocodingService/geocoding.service';
import { Point } from 'src/app/model';
import 'rxjs/add/observable/of';
import { Observable} from 'rxjs';
import { By } from '@angular/platform-browser';

//#region Mock definitions
@Pipe({name: 'coordinateFormatter'})
class CoordinateFormatterPipeMock implements PipeTransform {
  transform(value: number, positiveSuffix: string, negativeSuffix: string): string {
    return value.toString();
  }
}
@Pipe({name: 'capitalize'})
class CapitalizePipeMock implements PipeTransform {
  transform(value: string): string {
    return value.toString();
  }
}

class GeocodingServiceMock {
  getLocation(point: Point) {
    return Observable.of('');
  }
}
//#endregion

describe('PointInfoComponent', () => {
  let component: PointInfoComponent;
  let fixture: ComponentFixture<PointInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PointInfoComponent,
        CapitalizePipeMock,
        CoordinateFormatterPipeMock
      ],
      providers: [
        { provide: CoordinateFormatterPipe, useClass: CoordinateFormatterPipeMock },
        { provide: CapitalizePipe, useClass: CapitalizePipeMock },
        { provide: GeocodingService, useClass: GeocodingServiceMock }
      ]
    })
    .compileComponents();
  }));

  describe('"is on water" section', () => {
    it('displays false when point is not on water', () => {
      fixture = TestBed.createComponent(PointInfoComponent);
      component = fixture.componentInstance;
      component.point = { isOnWater: false, latitude: 0, location: null, longitude: 0 };
      fixture.detectChanges();

      const selector = 'dl.row:nth-child(2) > div.col-6:nth-child(1) > dd';
      const element = fixture.debugElement.query(By.css(selector));
      expect(element).toBeDefined();
      expect(element.nativeElement.innerText).toBe('false');
    });

    it('displays true when point is on water', () => {
      fixture = TestBed.createComponent(PointInfoComponent);
      component = fixture.componentInstance;
      component.point = { isOnWater: true, latitude: 0, location: null, longitude: 0 };
      fixture.detectChanges();

      const selector = 'dl.row:nth-child(2) > div.col-6:nth-child(1) > dd';
      const element = fixture.debugElement.query(By.css(selector));
      expect(element).toBeDefined();
      expect(element.nativeElement.innerText).toBe('true');
    });
  });

  describe('"location" section', () => {
    it('does not display location when on water', () => {
      fixture = TestBed.createComponent(PointInfoComponent);
      component = fixture.componentInstance;
      component.point = { isOnWater: true, latitude: 0, location: 'Tokio', longitude: 0 };
      fixture.detectChanges();

      const selector = 'dl.row:nth-child(2) > div.col-6:nth-child(2)';
      const element = fixture.debugElement.query(By.css(selector));
      expect(element).toBeFalsy();
    });

    it('displays "loading..." when not on water and location is null', () => {
      fixture = TestBed.createComponent(PointInfoComponent);
      component = fixture.componentInstance;
      component.point = {isOnWater: false, latitude: 0, location: null, longitude: 0};
      fixture.detectChanges();

      const selector = 'dl.row:nth-child(2) > div.col-6:nth-child(2) > dd';
      const element = fixture.debugElement.query(By.css(selector)).nativeElement;
      expect(element).toBeDefined();
      expect(element.innerText).toBe('loading...');
    });

    it('displays location when not on water and location is set', () => {
      fixture = TestBed.createComponent(PointInfoComponent);
      component = fixture.componentInstance;
      component.point = {isOnWater: false, latitude: 0, location: 'Tokio', longitude: 0};
      fixture.detectChanges();

      const selector = 'dl.row:nth-child(2) > div.col-6:nth-child(2) > dd';
      const element = fixture.debugElement.query(By.css(selector)).nativeElement;
      expect(element).toBeDefined();
      expect(element.innerText).toBe('Tokio');
    });

    fit('does not call geocoding service when point is on water', inject([GeocodingService], (service: GeocodingService) => {
      fixture = TestBed.createComponent(PointInfoComponent);

      const spy = spyOn(service, 'getLocation').and.returnValue(Observable.of<String>(''));

      component = fixture.componentInstance;
      component.point = {isOnWater: true, latitude: 0, location: null, longitude: 0};
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();
    }));

    fit('calls geocoding service when point is not on water', inject([GeocodingService], (service: GeocodingService) => {
      fixture = TestBed.createComponent(PointInfoComponent);

      const spy = spyOn(service, 'getLocation').and.returnValue(Observable.of<String>(''));

      component = fixture.componentInstance;
      component.point = {isOnWater: false, latitude: 0, location: null, longitude: 0};
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('"latitude and longitude" section', () => {
    it('displays latitude and longitude', () => {
      fixture = TestBed.createComponent(PointInfoComponent);
      component = fixture.componentInstance;
      component.point = {isOnWater: true, latitude: 10, location: null, longitude: 20};
      fixture.detectChanges();

      const latitudeSelector = 'dl.row:nth-child(1) > div.col-6:nth-child(1) > dd';
      const latitudeElement = fixture.debugElement.query(By.css(latitudeSelector)).nativeElement;
      expect(latitudeElement).toBeDefined();
      expect(latitudeElement.innerText).toBe('10');

      const longitudeSelector = 'dl.row:nth-child(1) > div.col-6:nth-child(2) > dd';
      const longitudeElement = fixture.debugElement.query(By.css(longitudeSelector)).nativeElement;
      expect(longitudeElement).toBeDefined();
      expect(longitudeElement.innerText).toBe('20');
    });
  });
});
