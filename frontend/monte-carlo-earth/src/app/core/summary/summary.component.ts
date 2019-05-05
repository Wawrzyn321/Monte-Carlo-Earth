import { Component, OnInit } from '@angular/core';
import { PointService } from '../pointService/point.service';
import { SummaryUpdateService } from '../summaryUpdateService/summary-update.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  allPointsCount = 0;
  waterPointsCount = 0;

  allPointsCountStart = 0;
  waterPointsCountStart = 0;
  ratioStart = 0;

  //#region Counto
  counto_allPointsCount: number;
  counto_waterPointsCount: number;
  counto_ratio: number;
  //#endregion

  onCountoEnd(): void {
    // after counto reached the "countTo", set new start variables
    // all 3 counters are set here, as they finish at the same time
    this.allPointsCountStart = this.allPointsCount;
    this.waterPointsCountStart = this.waterPointsCount;
    this.ratioStart = this.ratio;
  }

  get ratio(): number {
    if (this.allPointsCount === 0) {
      return 0;
    } else {
      return this.waterPointsCount / this.allPointsCount;
    }
  }

  constructor(private pointService: PointService, private summaryUpdateService: SummaryUpdateService) { }

  ngOnInit() {
    this.pointService.getPointsSummary().subscribe(summary => {
      this.allPointsCount = summary.allCount;
      this.waterPointsCount = summary.waterCount;
    }, () => {});

    this.summaryUpdateService.incrementEvent.subscribe(point => {
      this.allPointsCount++;
      if (point.isOnWater) {
        this.waterPointsCount++;
      }
    });
  }

}
