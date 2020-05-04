import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SidenavComponent } from './sidenav.component';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
