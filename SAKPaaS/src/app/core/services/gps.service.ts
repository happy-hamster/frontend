import { Injectable } from '@angular/core';
import { GpsCoordinates } from '../models/gps-coordinates.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { GlobalDialogService } from './global-dialog.service';
import { DialogMessageReturnTypes } from '../models/dialog-message.interface';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private static PERMISSION_COOKIE_NAME = 'permission_gps_granted';
  private static HOME_LOCATION: GpsCoordinates = { longitude: 10.018343, latitude: 51.133481, fromDevice: false };

  private coordinates = new BehaviorSubject<GpsCoordinates>(GpsService.HOME_LOCATION);

  constructor(
    private snackBarService: SnackBarService,
    private cookieService: CookieProviderService,
    private dialogService: GlobalDialogService
  ) {
    if (!this.cookieService.isCookieAlreadySet(GpsService.PERMISSION_COOKIE_NAME)) {
      this.askForPermission().then((granted) => {
        if (granted) {
          this.cookieService.allowCookies();
          this.cookieService.setCookie(GpsService.PERMISSION_COOKIE_NAME, 'true');
          this.updateRealGpsPosition();
        } else {
          console.warn('Access to GPS position denied. What to do?');
        }
      });
    } else {
      this.updateRealGpsPosition();
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
    return this.coordinates.getValue();
  }

  public updateRealGpsPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.coordinates.next({ longitude, latitude, fromDevice: true });
      }, (positionError) => {
        switch (positionError.code) {
          case positionError.PERMISSION_DENIED:
            this.snackBarService.sendNotification({
              messageKey: 'snack-bar.gps.permission-denied',
              type: SnackBarTypes.ERROR
            });
            break;
          case positionError.POSITION_UNAVAILABLE:
            this.snackBarService.sendNotification({
              messageKey: 'snack-bar.gps.position-unavailable',
              type: SnackBarTypes.ERROR
            });
            break;
          case positionError.TIMEOUT:
            this.snackBarService.sendNotification({
              messageKey: 'snack-bar.gps.timeout',
              type: SnackBarTypes.ERROR
            });
            break;
          default:
            this.snackBarService.sendNotification({
              messageKey: 'snack-bar.gps.default',
              type: SnackBarTypes.ERROR
            });
            break;
        }
      });
    } else {
      this.snackBarService.sendNotification({
        messageKey: 'snack-bar.gps.not-supported',
        type: SnackBarTypes.ERROR
      });
      console.warn('No support for geolocation');
      return undefined;
    }
  }

  private askForPermission(): Promise<boolean> {
    return new Promise((resolve, _) => {
      this.dialogService.showDialog(
        {
          titleKey: 'dialog.permissions.title',
          messageKey: 'dialog.permissions.message',
          cancelButtonTextKey: 'dialog.permissions.cancel-button',
          okButtonTextKey: 'dialog.permissions.ok-button'
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
