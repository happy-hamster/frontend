import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BadgeNotificationComponent } from 'src/app/components/badge-notification/badge-notification.component';



@NgModule({
  declarations: [
    UserCardComponent
  ],
  entryComponents: [
    BadgeNotificationComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserCardModule { }
