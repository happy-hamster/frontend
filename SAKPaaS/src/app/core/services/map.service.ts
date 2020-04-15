import { Injectable } from '@angular/core';
import { PositionCoordinates } from '../models/position-coordinates.model';
import { Observable, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { GlobalDialogService } from './global-dialog.service';
import { DialogMessageReturnTypes } from '../models/dialog-message.interface';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';
import { map, filter } from 'rxjs/operators';
import { PropagateGuard } from '../models/propagate-guard.interface';
import { CheckboxesDialog } from '../models/checkboxes-dialog.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private static PERMISSION_COOKIE_NAME = 'permission_gps_granted';
  private static HOME_LOCATION = new PositionCoordinates(10.018343, 51.133481);


  // minimum zoom level to load/display any locations
  public static ZOOM_LIMIT = 11;

  // minimum distance in meters to trigger a reload
  public static MOVE_LIMIT = 1000;

  // to stop propagation cycle
  // new map center -> setting to ol map -> event listener called -> new map center (respectively for zoom level)
  // a guard was added to optionally cancel propagation
  private mapCenter = new BehaviorSubject<PropagateGuard<PositionCoordinates>>
    ({ propagate: true, val: MapService.HOME_LOCATION });
  private mapZoomLevel = new BehaviorSubject<PropagateGuard<number>>
    ({ propagate: true, val: 6 });

  // The map should only zoom to the users location on the first page load.
  // After it did that, isInitial will be false.
  public isInitial = true;

  constructor(
    private snackBarService: SnackBarService,
    private cookieService: CookieProviderService,
    private dialogService: GlobalDialogService
  ) {
    if (!this.cookieService.isCookieAlreadySet(MapService.PERMISSION_COOKIE_NAME)) {
      this.askForPermission().then((checkboxesDialog) => {
        if (checkboxesDialog.cookiesAllowed) {
          this.cookieService.allowCookies();
          console.log('Cookies allowed.');
        } else {
          console.warn('Cookies not allowed. What to do?');
        }
        if (checkboxesDialog.gpsAllowed) {
          this.cookieService.setCookie(MapService.PERMISSION_COOKIE_NAME, 'true');
          this.updateRealGpsPosition();
          console.log('Access to GPS allowed.');
        } else {
          console.warn('Access to GPS position denied. What to do?');
        }
      });
    }
  }

  public getMapCenter(): Observable<PositionCoordinates> {
    return this.mapCenter.pipe(map(x => x.val));
  }

  /**
   * Use this filtered variant for setting the center of the actual map.
   * This stops an event propagation cycle between the OL map and rxjs.
   */
  public getMapCenterFiltered(): Observable<PositionCoordinates> {
    return this.mapCenter.pipe(filter(x => x.propagate), map(x => x.val));
  }

  public getCurrentMapCenter(): PositionCoordinates {
    return this.mapCenter.getValue().val;
  }

  public setMapCenter(coordinates: PositionCoordinates, propagate = true) {
    this.mapCenter.next({ propagate, val: coordinates });
  }

  public getMapZoomLevel(): Observable<number> {
    return this.mapZoomLevel.pipe(map(x => x.val));
  }

  /**
   * Use this filtered variant for setting the zoom of the actual map.
   * This stops an event propagation cycle between the OL map and rxjs.
   */
  public getMapZoomLevelFiltered(): Observable<number> {
    return this.mapZoomLevel.pipe(filter(x => x.propagate), map(x => x.val));
  }

  public getCurrentMapZoomLevel(): number {
    return this.mapZoomLevel.getValue().val;
  }

  public setMapZoomLevel(level: number, propagate = true) {
    this.mapZoomLevel.next({ propagate, val: level });
  }

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

  public updateRealGpsPosition() {
    this.getGpsPosition().then(position => {
      this.setMapCenter(position);
      this.setMapZoomLevel(15);
    }).catch(reason => {
      this.snackBarService.sendNotification({
        messageKey: 'snack-bar.gps.' + reason,
        type: SnackBarTypes.ERROR
      });
    });
  }

  private askForPermission(): Promise<CheckboxesDialog> {
    return new Promise((resolve, _) => {
      this.dialogService.showDialog(
        {
          titleKey: 'dialog.permissions.title',
          messageKey: 'dialog.permissions.message',
          checkboxCookieTextKey: 'dialog.permissions.checkbox-cookie',
          checkboxGpsTextKey: 'dialog.permissions.checkbox-gps',
          cancelButtonTextKey: 'dialog.permissions.cancel-button',
          okButtonTextKey: 'dialog.permissions.ok-button'
        }
      ).subscribe((result) => {
        switch (result) {
          case DialogMessageReturnTypes.OKAY:
            resolve(new CheckboxesDialog(true, true));
            break;
          case DialogMessageReturnTypes.CANCELLED:
            resolve(new CheckboxesDialog(false, false));
            break;
          case DialogMessageReturnTypes.ONLYCOOKIES:
            resolve(new CheckboxesDialog(true, false));
            break;
          case DialogMessageReturnTypes.ONLYGPS:
            resolve(new CheckboxesDialog(false, true));
            break;
        }
      });
    });
  }

  /**
   * What this actually does is reset the `propagate` property to true so the next time the map is loaded,
   * the current values are being used.
   */
  public saveMapState() {
    this.setMapCenter(this.getCurrentMapCenter());
    this.setMapZoomLevel(this.getCurrentMapZoomLevel());
  }

}
