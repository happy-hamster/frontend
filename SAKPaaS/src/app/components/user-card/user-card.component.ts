import { Component } from '@angular/core';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';
import { BackgroundBlurService } from 'src/app/core/services/background-blur.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  expanded = false;

  constructor(
    public authService: AuthKeycloakService,
    private backgroundBlurService: BackgroundBlurService
  ) { }

  currentLevel = 'Novize';
  remainingReports = 1;
  currentProgress = 73;

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

    this.backgroundBlurService.setBlur(this.expanded);
  }

}
