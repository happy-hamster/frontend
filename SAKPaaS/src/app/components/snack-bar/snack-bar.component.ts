import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.snackBarService.getNotification().subscribe(notification => {
      const config = this.getConfigForSnackBarType(notification.type);

      console.log(config);

      this.snackBar.open(notification.message, 'X', config);
      console.log(notification);
    });

  }

  public getConfigForSnackBarType(type: SnackBarTypes): MatSnackBarConfig {
    if (type === SnackBarTypes.ERROR) {
      return {
        duration: 4000,
        panelClass: ['error-snack-bar']
      };
    }
    if (type === SnackBarTypes.SUCCESS) {
      return {
        duration: 2000,
        panelClass: ['success-snack-bar']
      };
    }
    return null;
  }

}
