import { TestBed } from '@angular/core/testing';

import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogTestingModule
      ]
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
