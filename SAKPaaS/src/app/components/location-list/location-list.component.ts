import {Component, OnInit, Input} from '@angular/core';
import {Location} from 'src/app/generated/models';
import {GpsService} from '../../core/services/gps.service';
import {getDistance as olGetDistance} from 'ol/sphere';
import {LocationCardComponent} from "../location-card/location-card.component";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  @Input() locations: Location[];
  @Input() isCloseToYouList?: boolean;

  constructor(
    private gpsService: GpsService
  ) { }

  ngOnInit(): void {
    this.locations.forEach((value, index, array) => {
      value.distance$ = LocationCardComponent.toDistanceString(olGetDistance(this.gpsService.getCurrentGpsCoordinates().toArray(),
        [value.coordinates.longitude, value.coordinates.latitude]));
    });
  }
}
