import { Injectable, Inject } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { CookieProviderService } from './cookie-provider.service';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith, shareReplay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectionService {

  private selectedLanguage$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private cookieService: CookieProviderService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.selectedLanguage$ = this.translateService.onLangChange.pipe(
      map(event => event.lang),
      startWith('de'),
      shareReplay(1)
    );

    this.selectedLanguage$.subscribe(lang => {
      this.document.documentElement.lang = lang;
      this.cookieService.setCookie('selected_language', lang);
    });
  }

  getSelectedLanguage(): Observable<string> {
    return this.selectedLanguage$;
  }

  toggleDeEn() {
    this.selectedLanguage$.pipe(take(1)).subscribe(lang => {
      const newL = lang === 'en' ? 'de' : 'en';
      this.translateService.use(newL);
    });
  }
}
