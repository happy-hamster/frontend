import { Component, OnInit } from '@angular/core';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';
import { BadgeType, Badge } from 'src/app/core/models/badge.interface';
import { Observable, of } from 'rxjs';
import { BackgroundBlurService } from 'src/app/core/services/background-blur.service';
import { BadgeNotificationComponent } from 'src/app/components/badge-notification/badge-notification.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  expanded = false;

  numberBadges = 12; // TODO: Dies muss noch berechnet werden
  page = 0;
  itemsPerPage = 4;
  totalPages = Math.ceil(this.numberBadges / this.itemsPerPage);
  rows = Math.ceil(this.numberBadges / 2);
  lockedBadges = this.itemsPerPage * this.totalPages - this.numberBadges;
  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;

  badges$: Observable<Badge[]>;

  constructor(
    public authService: AuthKeycloakService,
    public dialog: MatDialog,
    private backgroundBlurService: BackgroundBlurService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.badges$ = of([
      { image: BadgeType.NEXT_LEVEL, count: 1 },
      { image: BadgeType.NEXT_LEVEL_CLASS, count: 2 },
      { image: BadgeType.REPORT, count: 1 },
      { image: BadgeType.NEW_REPORT, count: 4 },
      { image: BadgeType.TWO_SHOPS, count: 5 },
      { image: BadgeType.SHOP_FIRST_REPORT, count: 1 },
      { image: BadgeType.WEEK_1, count: 7 },
      { image: BadgeType.WEEK_3, count: 1 },
      { image: BadgeType.WEEK_FULL, count: 3 },
      { image: BadgeType.WEEK_SPECIAL, count: 1 },
      { image: BadgeType.TRUSTED_SHOP, count: 1 },
      { image: BadgeType.TRUSTED_USER, count: 1 }
    ]);
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.expanded = params.get('showBadges') === 'true';
      this.backgroundBlurService.setBlur(this.expanded);
    });
  }

  array(n: number): any[] {
    return Array(n);
  }

  backPage() {
    if (this.page > 0) {
      this.page--;
    }
  }
  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
    }
  }
  change() {
    if (this.expanded) {
      this.router.navigate(['/'], { queryParams: {} });
    } else {
      this.router.navigate(['/'], { queryParams: { showBadges: true } });
    }
  }

  showNotification() {
    this.dialog.open(BadgeNotificationComponent);
  }
}
