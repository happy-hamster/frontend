import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogTestingModule
      ]
    });
    service = TestBed.inject(PermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
