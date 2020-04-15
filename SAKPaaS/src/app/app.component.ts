import { Component, OnInit, Inject } from '@angular/core';
import { LocationProviderService } from './core/services/location-provider.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models/location';
import { TranslateService } from '@ngx-translate/core';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';
import { MixpanelService, MixpanelId } from './core/services/mixpanel.service';
import { DOCUMENT } from '@angular/common';
import { PwaRequestCatcherService } from './generated/services/pwa-request-catcher.service';
import { PwaRequestPromptService } from './generated/services/pwa-request-prompt.service';

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
    private pwaRequestPromptService: PwaRequestPromptService,
    private cookieService: CookieProviderService,
    private mixpanelService: MixpanelService,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.mixpanelService.track(MixpanelId.INIT);
    let lang = 'de';

    if (this.cookieService.isCookieAlreadySet('selected_language')) {
      lang = this.cookieService.getValue('selected_language');
    } else if (this.translate.getBrowserLang() !== 'de') {
      lang = 'en';
    }

    this.translate.use(lang);
    this.document.documentElement.lang = lang;
  }

  ngOnInit() {
    this.locations$ = this.locationService.fetchLocations();

    const setTimeoutAsync = (a, t: number) => new Promise(() => setTimeout(a, t));

    setTimeoutAsync(() => this.pwaRequestPromptService.showPwaRequest(), 1000 * 30);
  }
}
