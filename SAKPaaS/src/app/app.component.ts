import { Component, OnInit } from '@angular/core';
import { LocationProviderService } from './core/services/location-provider.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SAKPaaS';

  locations$: Observable<Location[]>;

  constructor(
    private locationService: LocationProviderService
  ) {
  }

  ngOnInit() {

    this.locations$ = this.locationService.fetchLocations(1000000);
  }
}
