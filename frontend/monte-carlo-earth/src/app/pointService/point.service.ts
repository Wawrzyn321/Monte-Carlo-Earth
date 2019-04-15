import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryViewModel, PointViewModel, API_CONFIG, ApiConfig } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private httpClient: HttpClient, @Inject(API_CONFIG) private config: ApiConfig) { }

  getPointsSummary() {
    return this.httpClient.get<SummaryViewModel>(this.config.pointsUrl);
  }

  addPoint() {
    return this.httpClient.post<PointViewModel>(this.config.pointsUrl, {});
  }
}
