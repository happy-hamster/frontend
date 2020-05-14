import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService {

  private kcInstance: Keycloak.KeycloakInstance;
  private user$ = new BehaviorSubject<User>(null);
  private token$ = new BehaviorSubject<string>(null);

  constructor() {
    this.kcInstance = Keycloak('/assets/keycloak.json');
    this.kcInstance.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
      if (authenticated) {
        this.loggedIn();
        this.token$.next(this.kcInstance.token);
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
    this.token$.next(null);
  }

  public register() {
    this.kcInstance.register().then(_ => this.loggedIn());
  }

  public getUser(): Observable<User> {
    return this.user$;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  public isLoggedInSnap(): boolean {
    return !!this.user$.getValue();
  }

  public getToken(): Observable<string> {
    return this.token$;
  }
}
