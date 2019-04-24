import { Component, OnInit, Input } from '@angular/core';
import { Point } from 'src/app/model';
import { GeocodingService } from 'src/app/core/geocodingService/geocoding.service';

@Component({
  selector: 'app-point-info',
  templateUrl: './point-info.component.html',
  styleUrls: ['./point-info.component.css']
})
export class PointInfoComponent implements OnInit {

  @Input() point: Point;

  constructor(private geocodingService: GeocodingService) {
  }

  ngOnInit() {
    if (this.point.isOnWater === false && this.point.location == null) { // todo check!
      this.geocodingService.getLocation(this.point).subscribe(location => {
        this.point.location = location.toString();
      }, () => this.point.location = 'Unknown');
    }
  }

}
