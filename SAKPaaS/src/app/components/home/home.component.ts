import { Component, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location'
import {Observable, of} from "rxjs";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
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

  openBottomSheet(): void {
    this._bottomSheet.open(LocationDetailsComponent);
  }
}
