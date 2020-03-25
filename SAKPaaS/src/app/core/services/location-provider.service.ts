import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { GpsService } from './gps.service';
import { switchMap, catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  private isLoadingLocations = new BehaviorSubject<boolean>(false);
  private locations$ = new BehaviorSubject<Location[]>([]);

  constructor(
    private locationApiService: LocationsService,
    private gpsService: GpsService
  ) {
    this.gpsService.getLocation().pipe(
      filter(coords => !!coords),
      switchMap(coords => {
        return this.locationApiService.searchLocations(coords);
      })
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
