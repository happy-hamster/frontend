import { TestBed } from '@angular/core/testing';

import { AuthKeycloakService } from './auth-keycloak.service';

describe('AuthKeycloakService', () => {
  let service: AuthKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
