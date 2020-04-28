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
    {image: 'new_report.png', label: 'New Report'},
    {image: 'next_level.png', label: 'Next Level'},
    {image: 'trusted_shop.png', label: 'Trusted Shop'},
    {image: 'week_1.png', label: 'Week 1'},
    {image: 'trusted_user.png', label: 'Trusted User'},
    {image: 'two_shops.png', label: 'Two Shops'},
    {image: 'week_3.png', label: 'Week 3'},
    {image: 'locked.png', label: 'Locked'},
    {image: 'locked.png', label: 'Locked'},
    {image: 'locked.png', label: 'Locked'}
    ,
  ];

  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;
}
