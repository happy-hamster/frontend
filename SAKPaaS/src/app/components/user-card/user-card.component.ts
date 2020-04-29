import { Component } from '@angular/core';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';
import { BadgeType } from 'src/app/core/services/badge.service';
import { Badge } from 'src/app/core/models/badge.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  expanded = false;

  badges$: Observable<Badge[]>;

  constructor(
    public authService: AuthKeycloakService
  ) {
    this.badges$ = of([
      {image: BadgeType.NEXT_LEVEL, count: 1},
      {image: BadgeType.NEXT_LEVEL_CLASS, count: 2},
      {image: BadgeType.REPORT, count: 1},
      {image: BadgeType.NEW_REPORT, count: 4},
      {image: BadgeType.TWO_SHOPS, count: 5},
      {image: BadgeType.SHOP_FIRST_REPORT, count: 1},
      {image: BadgeType.WEEK_1, count: 7},
      {image: BadgeType.WEEK_3, count: 1},
      {image: BadgeType.WEEK_FULL, count: 3},
      {image: BadgeType.WEEK_SPECIAL, count: 1},
      {image: BadgeType.TRUSTED_SHOP, count: 1},
      {image: BadgeType.TRUSTED_USER, count: 1}
    ]);
  }

  numberBadges = 12; // Dies muss noch berechnet werden
  page = 1;
  itemsPerPage = 5;
  totalPages = Math.ceil(this.numberBadges / this.itemsPerPage);
  lockedBadges = this.itemsPerPage * this.totalPages - this.numberBadges;
  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;

  array(n: number): any[] {
    return Array(n);
  }

  backPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }
  change() {
    const element = document.getElementById('user-card');
    if (this.expanded) {
      this.expanded = !this.expanded;
      element.classList.remove('expanded');
      element.setAttribute('style', '');
      document.getElementsByClassName('expand-icon')[0].classList.remove('turned');
      document.getElementsByClassName('content')[0].setAttribute('style', 'text-align: left;');


    } else {
      this.expanded = !this.expanded;
      element.classList.add('expanded');
      document.getElementsByClassName('expand-icon')[0].classList.add('turned');
      document.getElementsByClassName('content')[0].setAttribute('style', 'text-align: center;');
    }
  }

}
