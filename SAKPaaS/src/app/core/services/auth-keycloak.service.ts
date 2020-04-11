import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService {

  private kcInstance: Keycloak.KeycloakInstance;

  constructor() {
    this.kcInstance = Keycloak('/assets/keycloak.json');
    this.kcInstance.init({}).then(authenticated => {
      if (!authenticated) {
        this.kcInstance.login().then(_ => this.loggedIn());
      } else {
        this.loggedIn();
      }
    });
  }

  private loggedIn() {
    console.log('user logged in...');
    this.kcInstance.loadUserProfile().then(profile => console.log(profile));
  }
}
