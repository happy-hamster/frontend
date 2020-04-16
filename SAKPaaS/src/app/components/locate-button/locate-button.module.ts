import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocateButtonComponent } from 'src/app/components/locate-button/locate-button.component';



@NgModule({
  declarations: [
    LocateButtonComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LocateButtonComponent
  ]
})
export class LocateButtonModule { }
