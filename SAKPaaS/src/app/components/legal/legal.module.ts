import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalComponent } from './legal.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ImpressumComponent } from 'src/app/components/legal/impressum/impressum.component';
import { LegalRoutingModule } from 'src/app/components/legal/legal-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CookieComponent } from './cookie/cookie.component';

// lazy loaded

@NgModule({
  declarations: [
    LegalComponent,
    PrivacyPolicyComponent,
    ImpressumComponent,
    CookieComponent
  ],
  imports: [
    CommonModule,
    LegalRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LegalModule { }
