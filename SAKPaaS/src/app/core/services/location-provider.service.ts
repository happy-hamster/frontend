import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { GpsService } from './gps.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  private isLoadingLocations = new BehaviorSubject<boolean>(false);

  constructor(
    private locationApiService: LocationsService,
    private gpsService: GpsService
  ) {

  }

  public fetchLocations(): Observable<Location[]> {
    return this.gpsService.getLocation().pipe(
      switchMap(gpsCoordinates => {
        if (!gpsCoordinates) {
          return undefined;
        }
        return this.locationApiService.searchLocations(gpsCoordinates);
      })
    );
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
