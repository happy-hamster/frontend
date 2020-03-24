import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ISnackBar } from 'src/app/core/models/snack-bar.interface';
import { DialogMessageReturnTypes, IDialogMessage } from '../models/dialog-message.interface';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/components/global-dialog/global-dialog.component';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalDialogService {

  private dialog$ = new Subject<IDialogMessage>();

  constructor(
    public dialogComp: MatDialog
  ) { }

  public showDialog(notification: IDialogMessage): Observable<DialogMessageReturnTypes> {
    const dialogRef = this.dialogComp.open(GlobalDialogComponent, {
      // width: '250px',
      data: notification
    });
    console.log(dialogRef);
    return dialogRef.beforeClosed();
  }

  public getDialog(): Observable<IDialogMessage> {
    return this.dialog$;
  }
}
