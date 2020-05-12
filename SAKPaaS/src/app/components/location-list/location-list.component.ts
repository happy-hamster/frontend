import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Location} from 'src/app/generated/models';
import {getDistance as olGetDistance} from 'ol/sphere';
import {GpsService} from '../../core/services/gps.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnChanges {

  @Input() locations: Location[];
  @Input() isCloseToYouList?: boolean;

  constructor(
    private gpsService: GpsService
  ) {
  }

  ngOnInit(): void {
    this.sortLocationsClosest();
  }

  ngOnChanges(): void {
    this.sortLocationsClosest();
  }

  private sortLocationsClosest(): void {
    this.locations.sort((a: Location, b: Location) => {
      const distA = olGetDistance(
        [a.coordinates.longitude, a.coordinates.latitude], this.gpsService.getCurrentGpsCoordinates().toArray()
      );
      const distB = olGetDistance(
        [b.coordinates.longitude, b.coordinates.latitude], this.gpsService.getCurrentGpsCoordinates().toArray()
      );
      console.log('sorting...' + this.locations.length);
      return distA < distB ? -1 : 1;
    });

  }

  public sortData(data) {
    console.log(data);
  }
}
