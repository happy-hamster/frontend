import { TestBed } from '@angular/core/testing';
import { GlobalDialogService } from 'src/app/core/services/global-dialog.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('GlobalDialogService', () => {
  let service: GlobalDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    service = TestBed.inject(GlobalDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
