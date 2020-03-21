import { Component, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location'
import {Observable, of} from "rxjs";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LocationDetailsComponent} from "../location-details/location-details.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation$: Observable<Location>;
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
      occupancy: 0.2
    });
    this.openBottomSheet()
  }

  openBottomSheet(): void {
    this._bottomSheet.open(LocationDetailsComponent, { data: this.selectedLocation$ });
  }
}
