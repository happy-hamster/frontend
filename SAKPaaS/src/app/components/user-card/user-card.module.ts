import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressBarModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserCardModule { }
