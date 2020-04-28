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
      element.setAttribute('style', 'width: 12%;');
      document.getElementsByClassName('expand-icon')[0].classList.remove('turned');
      document.getElementsByClassName('content')[0].classList.remove('expandedContent');
    } else {
      element.setAttribute('style', 'width: 25%;');
      document.getElementsByClassName('expand-icon')[0].classList.add('turned');
      await this.delay(500);
      document.getElementsByClassName('content')[0].classList.add('expandedContent');
    }
    this.expanded = !this.expanded;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
