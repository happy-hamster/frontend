import { Injectable } from '@angular/core';
import { PositionCoordinates } from '../models/position-coordinates.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

   private gpsCoordinates = new BehaviorSubject<PositionCoordinates>(null);

  constructor(
    private permissionsService: PermissionsService
  ) { }

  public updateGpsPosition(): Promise<PositionCoordinates> {
    return new Promise((resolve, reject) => {
      this.permissionsService.getPermissions().then(result => {
        if (result.gpsAllowed) {
          this.getGpsPosition().then(position => {
            this.gpsCoordinates.next(position);
            resolve(position);
          }).catch(reason => {
            console.warn('couldn\'t update gps positions. reason:' + reason);
            reject(reason);
          });
        }
      }).catch();
    });
  }

  /**
   * Returns the PositionCoordinates as Observable.
   *
   * If the current position coordinates are null, it tries to update the gps positions
   */
  public getGpsCoordinates(): Observable<PositionCoordinates> {
    if (this.gpsCoordinates.getValue() === null) {
      this.updateGpsPosition();
    }
    return this.gpsCoordinates;
  }

  /**
   * Returns the PositionCoordinates as a snapshot.
   *
   * If the current position coordinates are null, it tries to update the gps positions
   */
  public getCurrentGpsCoordinates(): PositionCoordinates {
    if (this.gpsCoordinates.getValue() === null) {
      this.updateGpsPosition();
    }
    return this.gpsCoordinates.getValue();
  }

  /**
   * calculates the gps coordinates via `navigator.geolocation.getCurrentPosition()` and returns the
   * `PositionCoordinates` or an error message as promise.
   */
  private getGpsPosition(): Promise<PositionCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          resolve(new PositionCoordinates(longitude, latitude));
        }, (positionError) => {
          switch (positionError.code) {
            case positionError.PERMISSION_DENIED:
              reject('permission-denied');
              break;
            case positionError.POSITION_UNAVAILABLE:
              reject('position-unavailable');
              break;
            case positionError.TIMEOUT:
              reject('timeout');
              break;
            default:
              reject('default');
              break;
          }
        });
      } else {
        reject('not-supported');
      }
    });
  }
}
