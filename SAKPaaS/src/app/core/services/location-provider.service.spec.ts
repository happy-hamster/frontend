import { TestBed } from '@angular/core/testing';

import { LocationProviderService } from './location-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('LocationProviderService', () => {
  let service: LocationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogTestingModule
      ]
    });
    service = TestBed.inject(LocationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
