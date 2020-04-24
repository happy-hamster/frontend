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

  change() {
    const element = document.getElementById('user-card');
    if (this.expanded) {
      element.classList.remove('expanded');
      document.getElementsByClassName('expand-icon')[0].classList.remove('turned');
      document.getElementsByClassName('content')[0].classList.remove('expandedContent');
    } else {
      element.classList.add('expanded');
      document.getElementsByClassName('expand-icon')[0].classList.add('turned');
      document.getElementsByClassName('content')[0].classList.add('expandedContent');
    }
    this.expanded = !this.expanded;
  }

}
