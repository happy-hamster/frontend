import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { MapService } from './map.service';
import { switchMap, catchError, filter, tap, startWith } from 'rxjs/operators';
import { PositionCoordinates } from '../models/position-coordinates.model';
import { getDistance as olGetDistance } from 'ol/sphere';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  private isLoadingLocations = new BehaviorSubject<boolean>(false);
  private locations$ = new BehaviorSubject<Location[]>([]);
  private lastUpdatedPosition?: PositionCoordinates = null;
  private reload$ = new Subject<string>();
  private shouldReloadLocations = true;

  constructor(
    private locationApiService: LocationsService,
    private mapService: MapService,
    private snackBarService: SnackBarService
  ) {
    this.reload$.pipe(
      startWith('init'),
      switchMap(_ =>
        this.mapService.getMapCenter().pipe(
          filter(_ => {
            if (this.shouldReloadLocations) {
              return true;
            } else {
              this.shouldReloadLocations = true;
              return false;
            }
          }),
          filter(coordinates => !!coordinates),
          filter(_ => this.mapService.getCurrentMapZoomLevel() > MapService.ZOOM_LIMIT),
          filter(newCoordinates => {
            if (this.lastUpdatedPosition !== null
              && olGetDistance(this.lastUpdatedPosition.toArray(), newCoordinates.toArray()) < MapService.MOVE_LIMIT) {
              return false;
            } else {
              this.lastUpdatedPosition = newCoordinates;
              return true;
            }
          }),
          switchMap(coordinates => {
            this.updateLoadingState(true);
            console.log('Loading new locations...');
            return this.locationApiService.searchLocations({ coordinates });
          }),
          tap(_ => this.updateLoadingState(false)),
          catchError((error) => {
            this.updateLoadingState(false);
            return throwError(error);
          })
        )
      )
    ).subscribe(this.locations$);
  }

  public querySearch(query: string): void {
    this.locationApiService.locationsSearchQueryGet({query}).pipe(
      catchError((error) => {
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.search.error',
          type: SnackBarTypes.ERROR
        });
        return throwError(error);
      })
    ).subscribe(locationSearchResult => {
      if (locationSearchResult.locations.length) {
        this.locations$.next(locationSearchResult.locations);
        const coords = new PositionCoordinates(locationSearchResult.coordinates.longitude, locationSearchResult.coordinates.latitude);
        this.shouldReloadLocations = false;
        this.mapService.setMapCenter(coords);
      } else {
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.search.not-found',
          type: SnackBarTypes.INFO
        });
      }
    });
  }

  public fetchLocations(): Observable<Location[]> {
    return this.locations$;
  }

  public reloadLocations(): void {
    this.lastUpdatedPosition = null;
    this.reload$.next('reload');
  }

  public fetchLocationById(id: number) {
    return this.locationApiService.locationsIdGet({ id });
  }

  private updateLoadingState(value: boolean) {
    this.isLoadingLocations.next(value);
  }

  public getLoadingLocationsState(): Observable<boolean> {
    return this.isLoadingLocations;
  }

  public getDistanceToLocation(location: Location): number {
    if (this.lastUpdatedPosition !== null) {
      return olGetDistance(this.lastUpdatedPosition.toArray(), [location.coordinates.longitude, location.coordinates.latitude]);
    }
    return null;
  }
}
