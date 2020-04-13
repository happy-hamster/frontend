import { TestBed } from '@angular/core/testing';

import { GpsService } from './gps.service';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('GpsService', () => {
  let service: GpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogTestingModule
      ]
    });
    service = TestBed.inject(GpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
