import { Component, OnInit } from '@angular/core';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';
import { BadgeType } from 'src/app/core/services/badge.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  badges$: Observable<BadgeType[]>;

  constructor(
    public authService: AuthKeycloakService
  ) {
    this.badges$ = of([BadgeType.NEXT_LEVEL, BadgeType.WEEK_SPECIAL, BadgeType.TRUSTED_USER]);
  }

  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;
}
