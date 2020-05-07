import { Component, OnInit } from '@angular/core';
import { LanguageSelectionService } from 'src/app/core/services/language-selection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public selectedLanguage$: Observable<string>;

  constructor(
    private languageService: LanguageSelectionService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage();
  }

  toggleLanguage() {
    this.languageService.toggleDeEn();
  }

}
