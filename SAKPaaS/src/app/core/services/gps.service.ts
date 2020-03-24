import { Injectable } from '@angular/core';
import { GpsCoordinates } from '../models/gps-coordinates.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { CookieService } from 'ngx-cookie-service';
import { GlobalDialogService } from './global-dialog.service';
import { DialogMessageReturnTypes } from '../models/dialog-message.interface';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private static PERMISSION_COOKIE_NAME = 'permission_gps_granted';
  private static HOME_LOCATION: GpsCoordinates = { longitude: 10.018343, latitude: 51.133481, fromDevice: false };

  private coordinates = new BehaviorSubject<GpsCoordinates>(GpsService.HOME_LOCATION);

  constructor(
    private snackBarService: SnackBarService,
    private cookieService: CookieService,
    private dialogService: GlobalDialogService
  ) {
    if (!this.isCookieAlreadySet()) {
      this.askForPermission().then((granted) => {
        if (granted) {
          this.cookieService.set(GpsService.PERMISSION_COOKIE_NAME, 'true', 5);
          this.updateRealGpsPostion();
        } else {
          console.warn('Access to GPS position denied. What to do?');
        }
      });
    } else {
      this.updateRealGpsPostion();
    }
  }

  public setLocation(coordinates: GpsCoordinates) {
    coordinates.fromDevice = false;
    this.coordinates.next(coordinates);
  }

  public getLocation(): Observable<GpsCoordinates> {
    return this.coordinates;
  }

  public getCurrentLocation(): GpsCoordinates {
    return this.coordinates.value;
  }

  private updateRealGpsPostion() {
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
    } else {
      this.snackBarService.sendNotification({ message: 'Wir konnten deine GPS-Koordinaten nicht abrufen :(', type: SnackBarTypes.ERROR });
      console.log('No support for geolocation');
      return undefined;
    }
  }

  private isCookieAlreadySet(): boolean {
    return this.cookieService.check(GpsService.PERMISSION_COOKIE_NAME);
  }

  private askForPermission(): Promise<boolean> {
    return new Promise((resolve, _) => {
      this.dialogService.showDialog(
        {
          header: 'Standortzugriff',
          message: 'HappyHamster funktioniert am besten, wenn du deinen GPS-Standort aktivierst.\
          Bitte genehmige den Zugriff auf deinen Standort',
          cancelButtonText: 'Nein, danke'
        }
      ).subscribe((result) => {
        switch (result) {
          case DialogMessageReturnTypes.OKAY:
            resolve(true);
            break;
          case DialogMessageReturnTypes.CANCELLED:
            resolve(false);
            break;
        }
      });
    });
  }

}
