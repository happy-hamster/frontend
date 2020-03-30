import { TestBed } from '@angular/core/testing';

import { CookieProviderService } from './cookie-provider.service';

describe('CookieProviderService', () => {
  let service: CookieProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
