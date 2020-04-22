import { KeycloakProfile } from 'keycloak-js';

export class User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(username: string, email: string, firstName: string, lastName: string) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static fromKCProfile(profile: KeycloakProfile) {
    return new User(profile.username, profile.email, profile.firstName, profile.lastName);
  }
}
