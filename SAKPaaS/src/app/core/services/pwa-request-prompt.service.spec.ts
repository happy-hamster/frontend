import { TestBed } from '@angular/core/testing';

import { PwaRequestPromptService } from './pwa-request-prompt.service';

describe('PwaRequestPromptService', () => {
  let service: PwaRequestPromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaRequestPromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
