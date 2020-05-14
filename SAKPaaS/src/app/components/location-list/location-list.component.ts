import {getDistance as olGetDistance} from 'ol/sphere';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Location} from 'src/app/generated/models';
import {GpsService} from '../../core/services/gps.service';
import {map} from "rxjs/operators";
import {PositionCoordinates} from "../../core/models/position-coordinates.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnChanges {

  @Input() locations: Location[];
  @Input() isCloseToYouList?: boolean;
  private latestPosition: PositionCoordinates;

  constructor(
    private gpsService: GpsService
  ) { }

  ngOnInit(): void {
    this.gpsService.getGpsCoordinates().pipe(
      map((position) => {
        console.log('Got new position');
        console.log(position);
        this.sortLocationsClosest(position);
        this.latestPosition = position;
      })
    );
  }

  ngOnChanges(): void {
    // reorder locations when the locations list changes because the search area changes
    this.sortLocationsClosest(this.latestPosition);
  }

  private sortLocationsClosest(position: PositionCoordinates): void {
    console.log('Sorting... Position:');
    console.log(position);
    if (position !== undefined) {
      this.locations.sort((a: Location, b: Location) => {
        const distA = olGetDistance([a.coordinates.longitude, a.coordinates.latitude], position.toArray());
        const distB = olGetDistance([b.coordinates.longitude, b.coordinates.latitude], position.toArray());
        return distA < distB ? -1 : 1;
      });
    }
  }
}
