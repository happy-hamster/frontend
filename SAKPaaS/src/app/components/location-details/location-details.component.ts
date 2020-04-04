import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {
  location$: Observable<Location>;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<LocationDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Observable<Location>,
    private router: Router,
  ) {
    this.location$ = data;
  }

  checkIn(location: Location): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['reportOccupancy', location.id]);
  }
}
