import { Component, OnInit, Input } from '@angular/core';
import { Point } from '../model';
import { GeocodingService } from '../geocodingService/geocoding.service';

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
    if (this.point.isOnWater === false) {
      this.geocodingService.getLocation(this.point).subscribe(location => {
        this.point.location = location.toString();
      }, () => this.point.location = 'Unknown');
    }
  }

}
