import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SnackBarTypes, ISnackBar } from 'src/app/core/models/snack-bar.interface';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  private notificationQueue: ISnackBar[] = [];

  constructor(
    private snackBarService: SnackBarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.snackBarService.getNotification().subscribe(notification => {
      this.notificationQueue.push(notification);
      if (!this.snackBarRef) {
        this.next();
      }
    });

  }

  private next() {
    if (this.notificationQueue.length === 0) { return; }
    const nextNotification = this.notificationQueue.shift();

    const config = this.getConfigForSnackBarType(nextNotification.type);

    if (nextNotification.big) {
      (config.panelClass as string[]).push('big');
    }
    if (nextNotification.hideCloseButton) {
      (config.panelClass as string[]).push('close-button-hidden');
    }


    if (nextNotification.closeObservable) {
      config.duration = null;
      nextNotification.closeObservable.subscribe(() => {
        this.snackBarRef?.dismiss();
      });
    }

    this.snackBarRef = this.snackBar.open(nextNotification.message, nextNotification.hideCloseButton ? null : 'X', config);
    this.snackBarRef.afterDismissed().subscribe(_ => {
      this.snackBarRef = null;
      this.next();
    });
  }

  public getConfigForSnackBarType(type: SnackBarTypes): MatSnackBarConfig {
    switch (type) {
      case SnackBarTypes.ERROR:
        return {
          duration: 4000,
          panelClass: ['error-snack-bar']
        };
      case SnackBarTypes.SUCCESS:
        return {
          duration: 2000,
          panelClass: ['success-snack-bar']
        };
      case SnackBarTypes.INFO:
        return {
          duration: 2000,
          panelClass: ['info-snack-bar'],
        };
    }
  }
}
