import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Location} from '../../generated/models/location';
import {UserFavoritesService} from '../../generated/services/user-favorites.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites$ = new BehaviorSubject<Location[]>(null);

  constructor(
    private userFavoritesService: UserFavoritesService
  ) {
    userFavoritesService.usersSelfFavoritesGet().subscribe(this.favorites$);
  }

  getFavorites(): BehaviorSubject<Location[]> {
    return this.favorites$;
  }

}
