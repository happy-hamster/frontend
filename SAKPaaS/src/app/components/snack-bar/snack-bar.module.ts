import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    SharedModule,
    MatSnackBarModule
  ],
  exports: [
    SnackBarModule
  ]
})
export class SnackBarModule { }
