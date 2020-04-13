import { NgModule } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  exports: [
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MatDialog, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ]
})
export class MatDialogTestingModule { }
