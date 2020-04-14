import { NgModule } from '@angular/core';
import { GlobalDialogComponent } from 'src/app/components/global-dialog/global-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    GlobalDialogComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule
  ]
})
export class GlobalDialogModule { }
