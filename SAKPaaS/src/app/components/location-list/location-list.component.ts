import { getDistance as olGetDistance } from 'ol/sphere';
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Location } from 'src/app/generated/models';
import { GpsService } from '../../core/services/gps.service';
import { PositionCoordinates } from '../../core/models/position-coordinates.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() locations: Location[];
  @Input() isCloseToYouList?: boolean;

  private latestPosition: PositionCoordinates;
  subscriptions = new Subscription();

  constructor(
    private gpsService: GpsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.gpsService.getGpsCoordinates().subscribe(position => {
        if (position !== null) {
          this.sortLocationsClosest(position);
          this.latestPosition = position;
        }
      })
    );
  }

  ngOnChanges(): void {
    // reorder locations when the locations list changes because the search area changes
    this.sortLocationsClosest(this.latestPosition);
  }

  private sortLocationsClosest(position: PositionCoordinates): void {
    if (position !== undefined && position !== null) {
      this.locations.sort((a: Location, b: Location) => {
        const distA = olGetDistance([a.coordinates.longitude, a.coordinates.latitude], position.toArray());
        const distB = olGetDistance([b.coordinates.longitude, b.coordinates.latitude], position.toArray());
        return distA < distB ? -1 : 1;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
