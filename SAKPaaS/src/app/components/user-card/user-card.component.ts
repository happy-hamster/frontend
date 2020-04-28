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
    this.badges$ = of([
      BadgeType.NEXT_LEVEL,
      BadgeType.NEXT_LEVEL_CLASS,
      BadgeType.REPORT,
      BadgeType.NEW_REPORT,
      BadgeType.TWO_SHOPS,
      BadgeType.SHOP_FIRST_REPORT,
      BadgeType.WEEK_1,
      BadgeType.WEEK_3,
      BadgeType.WEEK_FULL,
      BadgeType.WEEK_SPECIAL,
      BadgeType.TRUSTED_SHOP,
      BadgeType.TRUSTED_USER
    ]);
  }

  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;
}
