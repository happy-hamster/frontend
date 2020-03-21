import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models';
import { switchMap } from 'rxjs/operators';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';

@Component({
  selector: 'app-occupany-report',
  templateUrl: './occupany-report.component.html',
  styleUrls: ['./occupany-report.component.scss']
})
export class OccupanyReportComponent implements OnInit {

  selectedLocation$: Observable<Location>;

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

}
