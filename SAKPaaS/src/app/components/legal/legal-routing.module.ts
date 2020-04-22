import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalComponent } from 'src/app/components/legal/legal.component';
import { ImpressumComponent } from 'src/app/components/legal/impressum/impressum.component';
import { PrivacyPolicyComponent } from 'src/app/components/legal/privacy-policy/privacy-policy.component';
import { CookieComponent } from 'src/app/components/legal/cookie/cookie.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'impressum'
  },
  {
    path: '',
    component: LegalComponent,
    children: [
      {
        path: 'impressum',
        component: ImpressumComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'cookies',
        component: CookieComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'impressum'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
