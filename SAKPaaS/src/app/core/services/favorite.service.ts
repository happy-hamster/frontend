import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Location} from '../../generated/models/location';
import {UserFavoritesService} from '../../generated/services/user-favorites.service';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites$ = new Observable<Location[]>(null);

  constructor(
    private userFavoritesService: UserFavoritesService
  ) {
    this.favorites$ = userFavoritesService.usersSelfFavoritesGet().pipe(share());
  }

  getFavorites(): Observable<Location[]> {
    return this.favorites$;
  }

}
