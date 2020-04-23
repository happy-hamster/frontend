import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserCardModule { }
