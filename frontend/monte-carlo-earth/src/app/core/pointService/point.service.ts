import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../apiConfig';
import { SummaryViewModel, PointViewModel } from 'src/app/model';

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
