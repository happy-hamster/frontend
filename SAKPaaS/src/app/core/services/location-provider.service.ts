import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, Subject, combineLatest } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { MapService } from './map.service';
import { switchMap, catchError, filter, tap, startWith, map, share } from 'rxjs/operators';
import { PositionCoordinates } from '../models/position-coordinates.model';
import { getDistance as olGetDistance } from 'ol/sphere';
import { SearchService } from './search.service';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocationCardService } from './location-card.service';

@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  private isLoadingLocations = new BehaviorSubject<boolean>(false);
  private lastUpdatedPosition?: PositionCoordinates = null;
  private reload$ = new BehaviorSubject<string>('init');
  private searchLocations$: Observable<Location[]>;
  private mapLocations$: Observable<Location[]>;

  constructor(
    private locationApiService: LocationsService,
    private locationCardService: LocationCardService,
    private mapService: MapService,
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {
    this.mapLocations$ = this.mapService.getMapCenter().pipe(
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
      }),
      share()
    );

    this.searchLocations$ = this.searchService.getLocations();
  }

  public fetchLocations(): Observable<Location[]> {
    return this.activatedRoute.queryParamMap.pipe(
      switchMap(result => {
        const query: ParamMap = result;
        if (query.has('searchTerm')) {
          return this.searchLocations$;
        } else {
          return this.mapLocations$;
        }
      }),
      tap(x => { console.log('fetchLocation außen'); }),
      tap(locations => { this.locationCardService.deselectIfNotInList(locations); })
    );
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
