import { Component, OnInit } from '@angular/core';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { Location } from 'src/app/generated/models';
import { Observable, throwError } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { OccupancyProviderService } from 'src/app/core/services/occupancy-provider.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';

@Component({
  selector: 'app-occupancy-report',
  templateUrl: './occupancy-report.component.html',
  styleUrls: ['./occupancy-report.component.scss']
})
export class OccupancyReportComponent implements OnInit {

  selectedLocation$: Observable<Location>;

  occupancyInput = new FormControl(null, Validators.required);

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationProviderService,
    private occupancyService: OccupancyProviderService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedLocation$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        if (!params.id) {
          return undefined;
        }
        return this.locationService.fetchLocationById(+params.id);
      })
    );

    this.selectedLocation$.subscribe(location => console.log(location));

    this.occupancyInput.valueChanges.subscribe(val => console.log(val));

  }

  public setRadioButton(value: string): void {
    this.occupancyInput.setValue(value);
  }

  public onSubmit() {
    if (this.occupancyInput.invalid) {

      this.snackBarService.sendNotification({
        message: 'Bitte sage uns deine persönliche Einschätzung der Auslastung :)',
        type: SnackBarTypes.ERROR
      });

      return undefined;
    }
    const value = +this.occupancyInput.value;

    this.selectedLocation$.pipe(
      switchMap( location => {
        return this.occupancyService.sendOccupancy(location.id, value);
      }),
      catchError(err => {
        this.snackBarService.sendNotification({
          message: 'Das hat leider nicht geklappt! Bitte versuche es erneut.',
          type: SnackBarTypes.ERROR
        });
        return throwError(err);
      })
    ).subscribe(location => {
      console.log(location);
      this.snackBarService.sendNotification({
        message: 'Vielen Dank für dein Feedback!',
        type: SnackBarTypes.SUCCESS
      });
    });

    this.router.navigate(['/'])

  }

}
