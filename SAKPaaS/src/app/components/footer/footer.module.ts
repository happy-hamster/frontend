import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    SharedModule,
    MatIconModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
