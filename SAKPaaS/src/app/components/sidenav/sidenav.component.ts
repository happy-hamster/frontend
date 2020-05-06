import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageSelectionService } from 'src/app/core/services/language-selection.service';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  open$ = new BehaviorSubject(false);

  constructor(
    private languageService: LanguageSelectionService,
    public authService: AuthKeycloakService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.open$.next(false);
  }

  open() {
    this.open$.next(true);
  }

  toggleLanguage() {
    this.languageService.toggleDeEn();
  }
}
