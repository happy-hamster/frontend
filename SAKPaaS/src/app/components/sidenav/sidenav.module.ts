import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SidenavComponent } from './sidenav.component';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
