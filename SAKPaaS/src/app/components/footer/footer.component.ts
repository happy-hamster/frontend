import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public selectedLanguage = 'de';

  constructor(
    private translate: TranslateService,
    private cookieService: CookieProviderService
  ) { }

  ngOnInit(): void {

    this.selectedLanguage = this.translate.currentLang;

    console.log(this.translate.currentLang);

    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.selectedLanguage = event.lang;
      this.cookieService.setCookie('selected_language', event.lang);
      console.log('selectedLanguage: ' + this.selectedLanguage);
    });
  }

  toggleLanguage() {
    const newL = this.selectedLanguage ===   'en' ? 'de' : 'en';
    this.translate.use(newL);
  }

}
