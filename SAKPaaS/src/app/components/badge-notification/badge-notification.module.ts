import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BadgeNotificationComponent } from './badge-notification.component';



@NgModule({
  declarations: [
    BadgeNotificationComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    BadgeNotificationComponent
  ]
})
export class BadgeNotificationModule { }
