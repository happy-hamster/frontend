import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { Location } from 'src/app/generated/models';
import { Observable, throwError, Subscription, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { OccupancyProviderService } from 'src/app/core/services/occupancy-provider.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';
import { IsLoadingService } from '@service-work/is-loading';
import { PwaRequestPromptService } from 'src/app/generated/services/pwa-request-prompt.service';

@Component({
  selector: 'app-occupancy-report',
  templateUrl: './occupancy-report.component.html',
  styleUrls: ['./occupancy-report.component.scss']
})
export class OccupancyReportComponent implements OnInit, OnDestroy {

  selectedLocation$: Observable<Location>;
  occupancyInput = new FormControl(null, Validators.required);
  subscriptions = new Subscription();
  lowValue = 0;
  mediumValue = 0.5;
  highValue = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationProviderService,
    private occupancyService: OccupancyProviderService,
    private snackBarService: SnackBarService,
    private router: Router,
    private isLoadingService: IsLoadingService,
    private pwaRequestPromptService: PwaRequestPromptService,
  ) { }

  ngOnInit(): void {
    this.selectedLocation$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        if (!params.id) {
          return of(undefined);
        }
        return this.locationService.fetchLocationById(+params.id);
      })
    );
  }

  public setRadioButton(value: number): void {
    this.occupancyInput.setValue(value);
  }

  public onSubmit() {
    if (this.occupancyInput.invalid) {
      this.snackBarService.sendNotification({
        messageKey: 'snack-bar.occupancy-report.invalid',
        type: SnackBarTypes.ERROR
      });
      return undefined;
    }
    const value = +this.occupancyInput.value;

    this.isLoadingService.add({ key: 'sendOccupancy' });

    this.selectedLocation$.pipe(
      switchMap(location => {
        return this.occupancyService.sendOccupancy(location.id, value);
      }),
      catchError(err => {
        this.isLoadingService.remove({ key: 'sendOccupancy' });
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.occupancy-report.failure',
          type: SnackBarTypes.ERROR
        });
        return throwError(err);
      })
    ).subscribe(location => {
      this.isLoadingService.remove({ key: 'sendOccupancy' });
      this.snackBarService.sendNotification({
        messageKey: 'snack-bar.occupancy-report.success',
        type: SnackBarTypes.SUCCESS
      });
      this.router.navigate(['home'], { queryParams: { id: location.id } });

      this.pwaRequestPromptService.showPwaRequest();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
