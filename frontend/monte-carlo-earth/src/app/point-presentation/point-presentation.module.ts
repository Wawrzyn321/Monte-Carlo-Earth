import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinateFormatterPipe } from './coordinateFormatterPipe/coordinate-formatter.pipe';
import { PointInfoComponent } from './point-info/point-info.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PointInfoComponent,
    CoordinateFormatterPipe
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    PointInfoComponent,
    CoordinateFormatterPipe
  ]
})
export class PointPresentationModule { }
