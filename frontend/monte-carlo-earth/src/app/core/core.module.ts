import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { API_CONFIG, ApiConfig } from './apiConfig';
import { ErrorHandlingInterceptor } from './error-handling.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SummaryComponent } from './summary/summary.component';
import { AddPointComponent } from './add-point/add-point.component';
import { PointPresentationModule } from '../point-presentation/point-presentation.module';

const baseUrl = 'https://localhost:44311/';
const apiConfig: ApiConfig = {
  pointsUrl: baseUrl + 'api/points',
  geocodingUrl:  baseUrl + 'api/geocoding'
};

@NgModule({
  declarations: [
    SummaryComponent,
    AddPointComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PointPresentationModule
  ],
  providers: [
    { provide: API_CONFIG, useValue: apiConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }
  ],
  exports: [
    PointPresentationModule,
    SummaryComponent,
    AddPointComponent
  ]
})
export class CoreModule { }
