import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from 'src/app/generated/models';

@Injectable({
  providedIn: 'root'
})
export class LocationCardService {

  private selectedLocationCard$ = new BehaviorSubject<Location>(null);

  constructor() { }

  getSelectedLocationCard(): Observable<Location> {
    return this.selectedLocationCard$;
  }

  setSelectedLocationCard(location: Location) {
    this.selectedLocationCard$.next(location);
  }

  deselectIfNotInList(locations: Location[]) {
    const selected = this.selectedLocationCard$.getValue();
    if (selected != null) {
      const exists = locations.some((loc) => loc.id === selected.id);
      if (!exists) {
        this.setSelectedLocationCard(null);
      }
    }
  }
}
