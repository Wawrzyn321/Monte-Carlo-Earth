import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../apiConfig';
import { Point } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private httpClient: HttpClient, @Inject(API_CONFIG) private config: ApiConfig) { }

  getLocation(point: Point) {
    const params = new HttpParams()
      .append('latitude', point.latitude.toString())
      .append('longitude', point.longitude.toString());

    return this.httpClient.get(this.config.geocodingUrl, { params });
  }
}
