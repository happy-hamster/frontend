import { Injectable } from '@angular/core';
import { GpsCoordinates } from '../models/gps-coordinates.interface';
import { Observable, of, Subject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private coordinates = new Subject<GpsCoordinates>();

  constructor(
    private snackBarService: SnackBarService
  ) { }

  public setLocation(coordinates: GpsCoordinates) {
    coordinates.fromDevice = false;
    this.coordinates.next(coordinates);
  }

  public getLocation(): Observable<GpsCoordinates> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude + ' - ' + latitude);
        this.coordinates.next({ longitude, latitude, fromDevice: true });
      }, (positionError) => {
        switch (positionError.code) {
          case positionError.PERMISSION_DENIED:
            this.snackBarService.sendNotification({
              message: 'Bitte erlaube HappyHamster, deine Position zu ermitteln.\
                Lade dazu entweder die Seite neu oder gehe in die Browser-Einstellungen.',
              type: SnackBarTypes.ERROR
            });
            break;
          case positionError.POSITION_UNAVAILABLE:
            this.snackBarService.sendNotification({
              message: 'HappyHamster konnte deine GPS-Position nicht ermitteln.',
              type: SnackBarTypes.ERROR
            });
            break;
          case positionError.TIMEOUT:
            this.snackBarService.sendNotification({
              message: 'HappyHamster konnte deine GPS-Position leider nicht ermitteln. Versuche es erneut.',
              type: SnackBarTypes.ERROR
            });
            break;
          default:
            this.snackBarService.sendNotification({
              message: 'HappyHamster konnte aus einem unbekannten Grund deine GPS-Position nicht ermitteln.',
              type: SnackBarTypes.ERROR
            });
            break;
        }
      });
      return this.coordinates;
    } else {
      this.snackBarService.sendNotification({ message: 'Wir konnten deine GPS-Koordinaten nicht abrufen :(', type: SnackBarTypes.ERROR });
      console.log('No support for geolocation');
      return undefined;
    }
  }

}
