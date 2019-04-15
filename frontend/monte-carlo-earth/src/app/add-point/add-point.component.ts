import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { PointService } from '../pointService/point.service';
import { Point } from '../model';
import { SummaryUpdateService } from '../summaryUpdateService/summary-update.service';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.css']
})
export class AddPointComponent implements OnInit {

  point: Point = null;
  private isAddingNewPoint = false;

  get addButtonDisabled(): boolean {
    return this.isAddingNewPoint;
  }

  get buttonText(): string {
    if (this.isAddingNewPoint) {
      return 'Adding...';
    } else {
      return this.point ? 'Add another' : 'Add new point!';
    }
  }

  constructor(private pointService: PointService, private summaryUpdateService: SummaryUpdateService) { }

  ngOnInit() {
  }

  addNewPoint() {
    this.isAddingNewPoint = true;
    this.point = null;

    this.pointService.addPoint().subscribe(point => {
      this.point = {
        latitude: point.latitude,
        longitude: point.longitude,
        isOnWater: point.isWater,
        location: null
      };

      this.summaryUpdateService.emitIncrementEvent(this.point);
      this.isAddingNewPoint = false;
    }, () => {
      this.isAddingNewPoint = false;
    });
  }

}
