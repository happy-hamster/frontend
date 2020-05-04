import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SidenavComponent } from './sidenav.component';
import { HammerModule } from '@angular/platform-browser';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatIconModule,
    HammerModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
