import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, EMPTY} from 'rxjs';
import {Location} from '../../generated/models/location';
import {UserFavoritesService} from '../../generated/services/user-favorites.service';
import { switchMap, map, catchError, tap, share, filter, first } from 'rxjs/operators';
import { LocationId } from 'src/app/generated/models';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { AuthKeycloakService } from './auth-keycloak.service';
import { LocationProviderService } from './location-provider.service';

enum UpdateType {
  ADD,
  DELETE
}

interface UpdateFavorite {
  type: UpdateType;
  location: Location;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites$: Observable<Location[]>;
  updateFavorite$ = new BehaviorSubject<UpdateFavorite>(null);

  constructor(
    private userFavoritesService: UserFavoritesService,
    private snackBarService: SnackBarService,
    private authService: AuthKeycloakService,
    private locationService: LocationProviderService
  ) {

    this.favorites$ = this.authService.isLoggedIn().pipe(
      filter(isLoggedIn => isLoggedIn),
      switchMap(_ => {
        return this.userFavoritesService.usersSelfFavoritesGet().pipe(
          catchError((error) => {
            console.error(error);
            return EMPTY;
          }),
          switchMap((favorites) => {
            return this.updateFavorite$.pipe(
              map((updatedFavorite) => {
                if (!updatedFavorite) {
                  return favorites;
                }
                if (updatedFavorite.type === UpdateType.ADD) {
                  favorites.push(updatedFavorite.location);
                } else {
                  const index = favorites.findIndex(
                    (fav) => fav.id === updatedFavorite.location.id
                  );
                  if (!index || index === -1) {
                    return favorites;
                  }
                  favorites[index] = updatedFavorite.location;
                  return favorites;
                }
              })
            );
          }),
          share()
        );
      })
    );
  }

  getFavorites(): Observable<Location[]> {
    return this.favorites$;
  }

  addFavorite(id: LocationId) {
    console.log('addFavorite with id ' + id);
    this.userFavoritesService.addFavorite({ id }).pipe(
      first(),
      catchError(error => {
        console.error(error);
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.favorite.added.error',
          type: SnackBarTypes.ERROR
        });
        return EMPTY;
      })
    ).subscribe(location => {
      console.log(location);
      if (!location) {
        return;
      }
      this.updateFavorite$.next({
        location,
        type: UpdateType.ADD
      });
      this.locationService.updateLocation(location);
      this.snackBarService.sendNotification({
        messageKey: 'snack-bar.favorite.added.success',
        type: SnackBarTypes.INFO
      });
    });
  }

  deleteFavorite(id: LocationId) {
    console.log('deleteFavorite with id ' + id);
    this.userFavoritesService.deleteFavorite({ id }).pipe(
      first(),
      catchError(error => {
        console.error(error);
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.favorite.deleted.error',
          type: SnackBarTypes.ERROR
        });
        return EMPTY;
      })
    ).subscribe(location => {
      console.log(location);
      if (!location) {
        return;
      }
      this.updateFavorite$.next({
        location,
        type: UpdateType.DELETE
      });
      this.locationService.updateLocation(location);
      this.snackBarService.sendNotification({
        messageKey: 'snack-bar.favorite.deleted.success',
        type: SnackBarTypes.INFO
      });
    });
  }
}
