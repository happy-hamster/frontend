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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {ReadableDistancePipe} from '../core/pipes/readable-distance.pipe';

@NgModule({
  declarations: [
    AddressPipe,
    ReadableDistancePipe,
  ],
  exports: [
    // angular modules
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    // angular material modules
    MatButtonModule,
    MatCheckboxModule,
    // third party modules
    ApiModule,
    IsLoadingModule,
    IsLoadingPipeModule,
    TranslateModule,
    // pipes
    AddressPipe,
    ReadableDistancePipe,
  ],
  providers: [],
})
export class SharedModule { }
