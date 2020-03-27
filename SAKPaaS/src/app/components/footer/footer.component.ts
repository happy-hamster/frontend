import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public selectedLanguage = 'de';

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.selectedLanguage = this.translate.currentLang;

    console.log(this.translate.currentLang);

    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.selectedLanguage = event.lang;
      console.log('selectedLanguage: ' + this.selectedLanguage);
    });
  }

  toggleLanguage() {
    // console.log('this.translate(' + this.selectedLanguage === 'en' ? 'de' : 'en' + ')');
    console.log('toggle()');
    const newL = this.selectedLanguage ===   'en' ? 'de' : 'en';
    this.translate.use(newL);
  }

}
