import { Component, OnInit } from '@angular/core';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  constructor(
    public authService: AuthKeycloakService
  ) { }

  currentLevel = 'Novize';
  xpRemaining = 12;
  currentProgress = 73;
}
