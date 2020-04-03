import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {
  location$: Observable<Location>;
  noAddressMessage = 'Wir konnten die Adresse leider nicht finden.';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<LocationDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Observable<Location>,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {
    this.location$ = data;
  }

  checkIn(location: Location): void {
    this.snackBarService.sendNotification({
      messageKey: 'snack-bar.location-details.check-in',
      valuesForMessage: { name: location.name},
      type: SnackBarTypes.SUCCESS
    });
    this.bottomSheetRef.dismiss();
    this.router.navigate(['reportOccupancy', location.id]);
  }

  getAddressString(location: Location): string {
    if (!location.street) {
      return null;
    }

    let erg = location.street;

    if (location.housenumber) {
      erg = erg + ' ' + location.housenumber;
    }
    if (location.postcode || location.city) {
      erg = erg + ', ';
    }
    if (location.postcode) {
      erg = erg + location.postcode + ' ';
    }
    if (location.city) {
      erg = erg + location.city;
    }
    return erg;
  }
}
