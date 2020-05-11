import { Injectable } from '@angular/core';
import { PositionCoordinates } from '../models/position-coordinates.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  /**
   * behavior subject to store the current gps coordinates
   * possible values:
   * * initial: `undefined`
   * * coordinates as: `PositionCoordinates`
   * * if an error occurs: `null` (see `errorMessage` for more details about the error)
   */
  private gpsCoordinates = new BehaviorSubject<PositionCoordinates>(undefined);

  /**
   * behavior subject to store the message if an error occurs while retrieving the gps coordinates
   * possible values:
   * * initial: `undefined`
   * * message as: `string`
   * * if no error occurs: `null`
   */
  private errorMessage = new BehaviorSubject<string>(undefined);

  constructor(
    private permissionsService: PermissionsService,
    private snackBarService: SnackBarService
  ) {
    if (navigator.geolocation) {
      this.permissionsService.getPermissions().then((result) => {
        if (!result.gpsAllowed) {
          console.log('permission-denied');
          this.errorMessage.next('permission-denied');
          return;
        }
        navigator.geolocation.watchPosition((position) => {
          this.gpsCoordinates.next(new PositionCoordinates(
            position.coords.longitude,
            position.coords.latitude
            ));
          this.errorMessage.next(null);
        }, (positionError) => {
          this.gpsCoordinates.next(null);
          switch (positionError.code) {
            case positionError.PERMISSION_DENIED:
              console.log('permission-denied');
              this.errorMessage.next('permission-denied');
              break;
            case positionError.POSITION_UNAVAILABLE:
              console.log('position-unavailable');
              this.errorMessage.next('position-unavailable');
              break;
            case positionError.TIMEOUT:
              console.log('timeout');
              this.errorMessage.next('timeout');
              break;
            default:
              console.log('default');
              this.errorMessage.next('default');
              break;
          }
        });
      });
    } else {
      console.log('not-supported');
      this.errorMessage.next('not-supported');
    }
  }

  private showErrorMessage() {
    const errorKey = this.errorMessage.getValue();

    console.log(errorKey);

    if (!errorKey) {
      return;
    }
    this.snackBarService.sendNotification({
      messageKey: 'snack-bar.gps.' + errorKey,
      type: SnackBarTypes.ERROR,
    });
  }

  /**
   * Returns the PositionCoordinates as Observable.
   *
   * @param shouldShowErrorMessage shows a snack bar message to the user. Default is `false`.
   */
  public getGpsCoordinates(shouldShowErrorMessage = false): Observable<PositionCoordinates> {
    return this.gpsCoordinates.pipe(
      tap(coordinates => {
        if (!coordinates && shouldShowErrorMessage) {
          this.showErrorMessage();
        }
      })
    );
  }

  /**
   * Returns the PositionCoordinates as a snapshot.
   *
   * @param shouldShowErrorMessage shows a snack bar message to the user. Default is `false`.
   */
  public getCurrentGpsCoordinates(shouldShowErrorMessage = false): PositionCoordinates {
    if (!this.gpsCoordinates.getValue() && shouldShowErrorMessage) {
      this.showErrorMessage();
    }
    return this.gpsCoordinates.getValue();
  }
}
