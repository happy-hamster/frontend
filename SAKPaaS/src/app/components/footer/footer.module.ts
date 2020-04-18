import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
