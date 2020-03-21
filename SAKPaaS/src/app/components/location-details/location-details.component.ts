import {Component, Inject, Input, OnInit} from '@angular/core';
import { Location } from '../../generated/models/location'
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  location: Location;
  constructor(private _bottomSheetRef: MatBottomSheetRef<LocationDetailsComponent>) {
    this.location = {
      id: 'string',
      latitude: 12,
      longtitude: 13,
      name: 'Rewe Center',
      occupancy: 5
    }
  }

  ngOnInit(): void {}

}
