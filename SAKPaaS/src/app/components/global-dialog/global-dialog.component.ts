import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogMessage, DialogMessageReturnTypes } from 'src/app/core/models/dialog-message.interface';


@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.scss']
})
export class GlobalDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogMessage
  ) { }

  onOkay(): void {
    this.dialogRef.close(DialogMessageReturnTypes.OKAY);
  }

  onCancelled(): void {
    this.dialogRef.close(DialogMessageReturnTypes.CANCELLED);
  }

}
