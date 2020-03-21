import { Component, OnInit } from '@angular/core';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { Location } from 'src/app/generated/models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-occupancy-report',
  templateUrl: './occupancy-report.component.html',
  styleUrls: ['./occupancy-report.component.scss']
})
export class OccupancyReportComponent implements OnInit {

  selectedLocation$: Observable<Location>;

  occupancyInput = new FormControl();

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationProviderService
  ) { }

  ngOnInit(): void {
    this.selectedLocation$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        if (!params.id) {
          return undefined;
        }
        return this.locationService.fetchLocationById(params.id);
      })
    );

    this.selectedLocation$.subscribe(location => console.log(location));

  }

  public setRadioButton(value: number): void {
    this.occupancyInput.setValue(value);
  }

}
