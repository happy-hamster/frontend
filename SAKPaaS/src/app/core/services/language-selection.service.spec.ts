import { TestBed } from '@angular/core/testing';

import { LanguageSelectionService } from './language-selection.service';
import { TranslateModule } from '@ngx-translate/core';

describe('LanguageSelectionService', () => {
  let service: LanguageSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({})
      ]
    });
    service = TestBed.inject(LanguageSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
