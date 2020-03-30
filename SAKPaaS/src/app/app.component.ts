import { Component, OnInit } from '@angular/core';
import { LocationProviderService } from './core/services/location-provider.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models/location';
import { TranslateService } from '@ngx-translate/core';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';

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
    private translate: TranslateService,
    private cookieService: CookieProviderService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them

    if (this.cookieService.isCookieAlreadySet('selected_language')) {
      this.translate.use(this.cookieService.getValue('selected_language'));
    } else {
      this.translate.use('de');
    }
  }

  ngOnInit() {
    this.locations$ = this.locationService.fetchLocations();
  }
}
