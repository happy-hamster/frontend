import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SnackBarTypes, ISnackBarInternal } from 'src/app/core/models/snack-bar.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  private isSnackBarLoading = false;

  private notificationQueue: ISnackBarInternal[] = [];

  constructor(
    private snackBarService: SnackBarService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.snackBarService.getNotification().subscribe(extNotification => {
      const notification = extNotification as ISnackBarInternal;
      this.notificationQueue.push(notification);
      notification.closeObservable?.subscribe(() => {
        // marks the notification as closed
        // this needs to be done because opening happens asynchronously
        notification.closed = true;
        // If the observable is triggered while the notification is
        // still on the queue it should be removed from it
        const index = this.notificationQueue.indexOf(notification);
        if (index === -1) { return; }
        this.notificationQueue.splice(index, 1);
      });
      if (!this.snackBarRef && !this.isSnackBarLoading) {
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

    this.isSnackBarLoading = true;
    this.translate.get(nextNotification.messageKey, nextNotification.valuesForMessage).subscribe(message => {
      this.isSnackBarLoading = false;

      // if the notification has been dismissed during the translation fix it must not be displayed
      if (nextNotification.closed) { this.next(); return; }

      if (nextNotification.closeObservable) {
        config.duration = null;
        nextNotification.closeObservable.subscribe(() => {
          this.snackBarRef?.dismiss();
        });
      }

      this.snackBarRef = this.snackBar.open(message, nextNotification.hideCloseButton ? null : 'X', config);

      this.snackBarRef.afterDismissed().subscribe(_ => {
        this.snackBarRef = null;
        this.next();
      });
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
