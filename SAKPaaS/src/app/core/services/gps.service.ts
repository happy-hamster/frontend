import { Injectable } from '@angular/core';
import { GpsCoordinates } from '../models/gps-coordinates.interface';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor() { }

  public getLocation(): GpsCoordinates {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          return { longitude, latitude };
        });
    } else {
       console.log('No support for geolocation');
       return undefined;
    }
  }

}
