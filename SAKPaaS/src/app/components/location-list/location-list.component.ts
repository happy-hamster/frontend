import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/generated/models';
import { GpsService } from '../../core/services/gps.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnChanges {

  @Input() locations: Location[];
  @Input() isCloseToYouList?: boolean;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.sortLocationsClosest();
  }

  private sortLocationsClosest(): void {
    this.locations.sort((a: Location, b: Location) => {
      const actualGps = this.gpsService.getCurrentGpsCoordinates();
      if (actualGps !== undefined) {
        const actualPosition = actualGps.toArray();

        const distA = olGetDistance([a.coordinates.longitude, a.coordinates.latitude], actualPosition);
        const distB = olGetDistance([b.coordinates.longitude, b.coordinates.latitude], actualPosition);
        return distA < distB ? -1 : 1;
      }
      return 0;
    });

  }

  public sortData(data) {
    console.log(data);
  }
}
