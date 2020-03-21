import { Injectable } from '@angular/core';
import { GpsCoordinates } from '../models/gps-coordinates.interface';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private coordinates = new Subject<GpsCoordinates>();

  constructor() { }

  public getLocation(): Observable<GpsCoordinates> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude + ' - ' + latitude);
        this.coordinates.next({ longitude, latitude });
      });
      return this.coordinates;
    } else {
      console.log('No support for geolocation');
      return undefined;
    }
  }

}
