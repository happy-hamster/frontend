import { TestBed } from '@angular/core/testing';

import { LocationCardService } from './location-card.service';

describe('LocationCardService', () => {
  let service: LocationCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
