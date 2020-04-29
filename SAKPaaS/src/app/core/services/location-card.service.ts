import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocationCardInterface} from '../models/location-card.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationCardService {

  private selectedLocationCard$ = new BehaviorSubject<LocationCardInterface>(null);

  constructor() { }

  getSelectedLocationCard(): Observable<LocationCardInterface> {
    return this.selectedLocationCard$;
  }

  setSelectedLocationCard(locationCard: LocationCardInterface) {
    this.selectedLocationCard$.next(locationCard);
  }
}
