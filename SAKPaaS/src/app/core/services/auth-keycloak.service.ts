import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService {

  private kcInstance: Keycloak.KeycloakInstance;
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() {
    this.kcInstance = Keycloak('/assets/keycloak.json');
    this.kcInstance.init({}).then(authenticated => {
      if (authenticated) {
        this.loggedIn();
      }
    });
  }

  private loggedIn() {
    console.log('user logged in...');
    this.kcInstance.loadUserProfile().then(profile => {
      this.user$.next(User.fromKCProfile(profile));
    });
  }

  public login() {
    // because the KeyCloak JS adapter uses window.location.replace internally,
    // we need to save the current URL so backwards navigation will be possible
    history.pushState(null, null, window.location.href);
    this.kcInstance.login().then(_ => this.loggedIn());
  }

  public logout() {
    this.kcInstance.logout();
    this.user$.next(null);
  }

  public register() {
    this.kcInstance.register().then(_ => this.loggedIn());
  }

  public getUser(): Observable<User> {
    return this.user$;
  }
}
