import { TestBed } from '@angular/core/testing';

import { BackgroundBlurService } from './background-blur.service';

describe('BackgroundBlurService', () => {
  let service: BackgroundBlurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundBlurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
