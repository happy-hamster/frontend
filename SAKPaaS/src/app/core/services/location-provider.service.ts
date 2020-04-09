import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { PositionService } from './position.service';
import { switchMap, catchError, filter, tap } from 'rxjs/operators';
import { PositionCoordinates } from '../models/gps-coordinates.interface';
import { getDistance as olGetDistance } from 'ol/sphere';


@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  // minimum distance in meters to trigger a reload
  private static MOVE_LIMIT = 1000;

  private isLoadingLocations = new BehaviorSubject<boolean>(false);
  private locations$ = new BehaviorSubject<Location[]>([]);
  private lastUpdatedPosition?: PositionCoordinates = null;

  constructor(
    private locationApiService: LocationsService,
    private positionService: PositionService
  ) {
    this.positionService.getMapCenter().pipe(
      filter(coordinates => !!coordinates),
      filter(newCoordinates => {
        if (this.lastUpdatedPosition === null) {
          this.lastUpdatedPosition = newCoordinates;
          return true;
        } else {
          const distance = olGetDistance(this.lastUpdatedPosition.toArray(), newCoordinates.toArray());
          if (distance < LocationProviderService.MOVE_LIMIT) {
            return false;
          } else {
            this.lastUpdatedPosition = newCoordinates;
            return true;
          }
        }
      }),
      switchMap(coordinates => {
        this.updateLoadingState(true);
        return this.locationApiService.searchLocations({ coordinates });
      }),
      tap(_ => this.updateLoadingState(false))
    ).subscribe(this.locations$);
  }

  public fetchLocations(): Observable<Location[]> {
    return this.locations$;
  }

  public fetchLocationById(id: number) {
    return this.locationApiService.locationsIdGet({ id });
  }

  public updateLoadingState(value: boolean) {
    this.isLoadingLocations.next(value);
  }

  public getLoadingLocationsState(): Observable<boolean> {
    return this.isLoadingLocations;
  }
}
