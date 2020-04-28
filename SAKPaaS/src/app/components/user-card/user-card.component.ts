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

  badges: Array<{image: string, label: string}> = [
    {image: 'assets/badges/new_report.png', label: 'New Report'},
    {image: 'assets/badges/next_level.png', label: 'Next Level'},
    {image: 'assets/badges/trusted_shop.png', label: 'Trusted Shop'},
    {image: 'assets/badges/week_1.png', label: 'Week 1'},
    {image: 'assets/badges/trusted_user.png', label: 'Trusted User'},
    {image: 'assets/badges/two_shops.png', label: 'Two Shops'},
    {image: 'assets/badges/week_3.png', label: 'Week 3'},
    {image: 'assets/badges/locked.png', label: 'Locked'},
    {image: 'assets/badges/locked.png', label: 'Locked'},
    {image: 'assets/badges/locked.png', label: 'Locked'}
    ,
  ];

  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;
}
