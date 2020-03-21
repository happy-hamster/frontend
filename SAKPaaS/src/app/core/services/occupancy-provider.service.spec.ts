import { TestBed } from '@angular/core/testing';

import { OccupancyProviderService } from './occupancy-provider.service';

describe('OccupancyProviderService', () => {
  let service: OccupancyProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupancyProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
