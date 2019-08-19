import { Component, OnInit, Input } from '@angular/core';
import { Point, LocationViewModel } from 'src/app/model';
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
    if (this.point.isOnWater === false && this.point.location == null) {
      this.geocodingService.getLocation(this.point).subscribe((locationViewModel: LocationViewModel) => {
        this.point.location = locationViewModel.location;
      }, () => this.point.location = 'Unknown');
    }
  }

}
