import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../generated/models/location'
import { Observable, of, Subject } from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { LocationDetailsComponent } from "../location-details/location-details.component";
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation$: Observable<Location>;

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor(private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  testBottomSheet(): void {
    this.selectedLocation$ = of({
      id: 234,
      latitude: 12,
      longitude: 13,
      name: 'Rewe Center',
      occupancy: 5
    });
    this.openBottomSheet()
  }

  onLocationEmitted(location: Location) {
    this.selectedLocation$ = of(location);
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(LocationDetailsComponent, { data: this.selectedLocation$ })
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.mapComp.deselect();
    });
  }
}
