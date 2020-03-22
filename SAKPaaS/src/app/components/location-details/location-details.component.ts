import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, throwError } from 'rxjs';
import { OccupancyProviderService } from 'src/app/core/services/occupancy-provider.service';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';
import { IsLoadingService } from '@service-work/is-loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  location$: Observable<Location>;
  noAddressMessage = 'Keine Adresse vorhanden.';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<LocationDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Observable<Location>,
    private occupancyService: OccupancyProviderService,
    private snackBarService: SnackBarService,
    private isLoadingService: IsLoadingService,
    private router: Router
  ) {
    this.location$ = data;
  }

  ngOnInit(): void { }

  checkIn(location: Location): void {
    this.isLoadingService.add({ key: 'checkIn'});
    this.occupancyService.checkIn(location.id).pipe(
      catchError(err => {
        this.isLoadingService.remove({ key: 'checkIn'});
        this.snackBarService.sendNotification({
          message: 'Wir konnten dich leider nicht einchecken! :( Bitte probiere es noch einmal.',
          type: SnackBarTypes.ERROR
        });
        return throwError(err);
      })
    ).subscribe(_ => {
      this.isLoadingService.remove({ key: 'checkIn'});
      this.snackBarService.sendNotification({
        message: 'Du bist jetzt in ' + location.name + ' eingecheckt. Viel Spaß!',
        type: SnackBarTypes.SUCCESS
      });
      this.bottomSheetRef.dismiss();
      this.router.navigate(['reportOccupancy', location.id]);
    });
  }

  getAddressString(location: Location): string {
    if (!location.street) {
      return this.noAddressMessage;
    }

    var erg = location.street;

    if (location.housenumber) {
      erg = erg + " " + location.housenumber;
    }
    if (location.postcode || location.city) {
      erg = erg + ", ";
    }
    if (location.postcode) {
      erg = erg + location.postcode + " ";
    }
    if(location.city) {
      erg = erg + location.city;
    }
    return erg;
  }
}
