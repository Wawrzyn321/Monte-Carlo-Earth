import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { AddPointComponent } from './add-point/add-point.component';
import { PointInfoComponent } from './point-info/point-info.component';
import { ErrorHandlingInterceptor } from './error-handling.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CoordinateFormatterPipe } from './coordinateFormatterPipe/coordinate-formatter.pipe';
import { API_CONFIG } from './model';
import { CapitalizePipe } from './capitalizePipe/capitalize.pipe';

const baseUrl = 'https://localhost:44311/';

const apiConfig = {
  pointsUrl: baseUrl + 'api/points',
  geocodingUrl:  baseUrl + 'api/geocoding'
};

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    AddPointComponent,
    PointInfoComponent,
    CoordinateFormatterPipe,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: API_CONFIG, useValue: apiConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
