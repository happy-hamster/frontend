import { TestBed } from '@angular/core/testing';

import { LocationProviderService } from './location-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LocationProviderService', () => {
  let service: LocationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot({})
      ]
    });
    service = TestBed.inject(LocationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
