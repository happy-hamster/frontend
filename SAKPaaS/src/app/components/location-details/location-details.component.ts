import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Observable } from "rxjs";

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  location$: Observable<Location>;
  constructor(private bottomSheetRef: MatBottomSheetRef<LocationDetailsComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Observable<Location>) {
    this.location$ = data;
  }

  ngOnInit(): void { }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }
}
