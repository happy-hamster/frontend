import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SidenavComponent } from './sidenav.component';
import { HammerModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    SharedModule,
    MatIconModule,
    HammerModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
