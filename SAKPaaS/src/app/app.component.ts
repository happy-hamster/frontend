import { Component, OnInit } from '@angular/core';
import { LocationProviderService } from './core/services/location-provider.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models/location';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SAKPaaS';

  locations$: Observable<Location[]>;

  constructor(
    private locationService: LocationProviderService,
    private translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');
  }

  ngOnInit() {
    this.locations$ = this.locationService.fetchLocations();
  }
}
