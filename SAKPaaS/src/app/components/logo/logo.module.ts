import { NgModule } from '@angular/core';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LogoComponent
  ]
})
export class LogoModule { }
