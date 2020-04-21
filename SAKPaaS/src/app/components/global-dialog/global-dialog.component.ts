import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogMessage, DialogMessageReturnTypes } from 'src/app/core/models/dialog-message.interface';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.scss']
})
export class GlobalDialogComponent {

  cookieCheckbox = new FormControl(false);
  gpsCheckbox = new FormControl(false);


  constructor(
    private dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogMessage
  ) { }

  onOkay(): void {
    if (this.cookieCheckbox && this.gpsCheckbox) {
      this.dialogRef.close(DialogMessageReturnTypes.OKAY);
    } else if (this.cookieCheckbox && !this.gpsCheckbox) {
      this.dialogRef.close(DialogMessageReturnTypes.ONLYCOOKIES);
    } else if (!this.cookieCheckbox && this.gpsCheckbox) {
      this.dialogRef.close(DialogMessageReturnTypes.ONLYGPS);
    } else {
      this.dialogRef.close(DialogMessageReturnTypes.CANCELLED);
    }
  }

  onCancelled(): void {
    this.dialogRef.close(DialogMessageReturnTypes.CANCELLED);
  }

}
