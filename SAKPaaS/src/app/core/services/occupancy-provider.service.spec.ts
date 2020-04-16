import { TestBed } from '@angular/core/testing';

import { OccupancyProviderService } from './occupancy-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('OccupancyProviderService', () => {
  let service: OccupancyProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogTestingModule
      ]
    });
    service = TestBed.inject(OccupancyProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
