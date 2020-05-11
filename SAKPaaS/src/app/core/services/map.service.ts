import { Injectable } from '@angular/core';
import { PositionCoordinates } from '../models/position-coordinates.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { map, filter, first, catchError } from 'rxjs/operators';
import { PropagateGuard } from '../models/propagate-guard.interface';
import { PermissionsService } from './permissions.service';
import { GpsService } from './gps.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
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
    private permissionsService: PermissionsService,
    private gpsService: GpsService
  ) { }

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

  public centerMapToGpsCoordinates(isCalledByUserAction = false) {
    this.permissionsService.getPermissions().then(result => {
      if (result.gpsAllowed) {
        this.gpsService.getGpsCoordinates(isCalledByUserAction).pipe(
          filter(coordinates => coordinates !== undefined),
          first()
          ).subscribe(position => {
          if (position) {
            this.setMapCenter(position);
            this.setMapZoomLevel(15);
          }
        });
      } else if (isCalledByUserAction) {
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.gps.permission-denied',
          type: SnackBarTypes.ERROR
        });
      }
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
