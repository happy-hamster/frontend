import { TestBed } from '@angular/core/testing';

import { LocationProviderService } from './location-provider.service';

describe('LocationProviderService', () => {
  let service: LocationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
