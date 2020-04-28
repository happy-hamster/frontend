import { Component } from '@angular/core';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  expanded = false;

  constructor(
    public authService: AuthKeycloakService
  ) { }

  async change() {
    const element = document.getElementById('user-card');
    if (this.expanded) {
      this.expanded = !this.expanded;
      element.setAttribute('style', 'width: 12%;');
      document.getElementsByClassName('expand-icon')[0].classList.remove('turned');
      document.getElementsByClassName('content')[0].setAttribute('style', 'text-align: center;');
      await this.delay(200);
      document.getElementsByClassName('content')[0].removeAttribute('style');


    } else {
      this.expanded = !this.expanded;
      element.setAttribute('style', 'width: 25%;');
      document.getElementsByClassName('expand-icon')[0].classList.add('turned');
      document.getElementsByClassName('content')[0].setAttribute('style', 'text-align: center;');
      await this.delay(200);
      document.getElementsByClassName('content')[0].setAttribute('style', 'width: 90%; text-align: center;');
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
