import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public selectedLanguage = 'de';

  constructor(
    private translate: TranslateService,
    private cookieService: CookieProviderService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {

    this.selectedLanguage = this.translate.currentLang;

    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.selectedLanguage = event.lang;
      this.document.documentElement.lang = event.lang;
      this.cookieService.setCookie('selected_language', event.lang);
    });
  }

  toggleLanguage() {
    const newL = this.selectedLanguage === 'en' ? 'de' : 'en';
    this.translate.use(newL);
  }

}
