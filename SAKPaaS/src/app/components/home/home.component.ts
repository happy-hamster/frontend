import { Component, ViewChild } from '@angular/core';
import { Location } from '../../generated/models/location';
import { Observable, of } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocationDetailsComponent } from '../location-details/location-details.component';
import { MapComponent } from '../map/map.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selectedLocation$: Observable<Location>;

  @ViewChild(MapComponent) mapComp: MapComponent;
  
  constructor(private bottomSheet: MatBottomSheet) { }

  onLocationEmitted(location: Location, fromMap: boolean) {
    this.selectedLocation$ = of(location);
    this.openBottomSheet(fromMap);
    if (!fromMap) {
      this.mapComp.zoomToNewLocation(location);
    }
  }

  openBottomSheet(fromMap: boolean): void {
    const bottomSheetRef = this.bottomSheet.open(LocationDetailsComponent, { data: this.selectedLocation$, disableClose: true });
    // Because of the maps weird interaction behaviours we need this workaround
    setTimeout(() => {
      bottomSheetRef.disableClose = false;
    }, 500);
    bottomSheetRef.afterDismissed().subscribe(() => {
      if (fromMap) {
        this.mapComp.deselect();
      }
    });
  }
}
