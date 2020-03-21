import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { LocationsService } from 'src/app/generated/services';
import { GpsService } from './gps.service';
import { LocationsQuery } from '../models/locations-query.interface';
import { HttpClient } from '@angular/common/http';
import { GpsCoordinates } from 'src/app/core/models/gps-coordinates.interface';

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
    // const gpsCoordinates = this.gpsService.getLocation();

    const gpsCoordinates: GpsCoordinates = {
      latitude: 0,
      longitude: 0
    };
    console.log(gpsCoordinates);

    if (!gpsCoordinates) {
      return undefined;
    }

    const query: LocationsQuery = {
      ...gpsCoordinates,
      radius
    };

    return this.locationApiService.searchLocations(query);
  }

  public fetchLocationById(id: string) {
    return this.locationApiService.locationsIdGet({ id });
  }
}
