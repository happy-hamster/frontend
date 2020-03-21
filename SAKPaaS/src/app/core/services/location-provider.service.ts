import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { GpsService } from './gps.service';
import { LocationsQuery } from '../models/locations-query.interface';
import { HttpClient } from '@angular/common/http';
import { GpsCoordinates } from 'src/app/core/models/gps-coordinates.interface';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  constructor(
    private locationApiService: LocationsService,
    private gpsService: GpsService
  ) {

  }

  public fetchLocations(radius: number = 5000): Observable<Location[]> {
    return this.gpsService.getLocation().pipe(
      switchMap(gpsCoordinates => {
        console.log(gpsCoordinates);
        if (!gpsCoordinates) {
          return undefined;
        }
        const query: LocationsQuery = {
          ...gpsCoordinates,
          radius
        };
        return this.locationApiService.searchLocations(query);
      })
    );
  }

  public fetchLocationById(id: string) {
    return this.locationApiService.locationsIdGet({ id });
  }
}
