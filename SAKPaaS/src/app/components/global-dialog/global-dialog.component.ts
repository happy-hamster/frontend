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

  cookieCheckbox = new FormControl(true);
  gpsCheckbox = new FormControl(true);


  constructor(
    private dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogMessage
  ) { }

  onOkay(): void {
    if (this.data.askForPermission) {
      if (this.cookieCheckbox.value && this.gpsCheckbox.value) {
        this.dialogRef.close(DialogMessageReturnTypes.OKAY);
      } else if (this.cookieCheckbox.value && !this.gpsCheckbox.value) {
        this.dialogRef.close(DialogMessageReturnTypes.ONLY_COOKIES);
      } else if (!this.cookieCheckbox.value && this.gpsCheckbox.value) {
        this.dialogRef.close(DialogMessageReturnTypes.ONLY_GPS);
      } else {
        this.dialogRef.close(DialogMessageReturnTypes.CANCELLED);
      }
    } else {
      this.dialogRef.close(DialogMessageReturnTypes.OKAY);
    }
  }

  onCancelled(): void {
    this.dialogRef.close(DialogMessageReturnTypes.CANCELLED);
  }

}
