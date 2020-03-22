import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
})
export class SharedModule { }
