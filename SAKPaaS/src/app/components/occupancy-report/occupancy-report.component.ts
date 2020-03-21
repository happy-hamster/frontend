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

  occupancyInput = new FormControl('0.33');

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

    this.occupancyInput.valueChanges.subscribe(val => console.log(val));

  }

  public setRadioButton(value: string): void {
    this.occupancyInput.setValue(value);
  }

  public onSubmit() {
    console.log(this.occupancyInput.value);
    const value = +this.occupancyInput.value;
    console.log(value);
  }

}
