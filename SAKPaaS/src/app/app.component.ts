import { Component, OnInit } from '@angular/core';
import { LocationProviderService } from './core/services/location-provider.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models/location';
import { TranslateService } from '@ngx-translate/core';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';
import { MixpanelService, MixpanelId } from './core/services/mixpanel.service';

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
    private cookieService: CookieProviderService,
    private mixpanelService: MixpanelService
  ) {
    console.log(this.translate.getBrowserLang());
    mixpanelService.track(MixpanelId.INIT);

    if (this.cookieService.isCookieAlreadySet('selected_language')) {
      this.translate.use(this.cookieService.getValue('selected_language'));
    } else {
      if (this.translate.getBrowserLang()) {
        if (this.translate.getBrowserLang() !== 'de') {
          this.translate.use('en');
        } else {
          this.translate.use('de');
        }
      } else {
        this.translate.use('de');
      }
    }
  }

  ngOnInit() {
    this.locations$ = this.locationService.fetchLocations();
  }
}
