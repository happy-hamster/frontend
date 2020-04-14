import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IsLoadingModule, IsLoadingPipeModule } from '@service-work/is-loading';
import { MatButtonModule } from '@angular/material/button';
import { ApiModule } from 'src/app/generated/api.module';
import { AddressPipe } from 'src/app/core/pipes/address.pipe';

@NgModule({
  declarations: [
    AddressPipe
  ],
  exports: [
    // angular modules
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    // angular material modules
    MatButtonModule,
    // third party modules
    ApiModule,
    IsLoadingModule,
    IsLoadingPipeModule,
    TranslateModule,
    // pipes
    AddressPipe
  ],
  providers: [],
})
export class SharedModule { }
