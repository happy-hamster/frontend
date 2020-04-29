import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { OccupancyViewModule } from 'src/app/components/occupancy-view/occupancy-view.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import {LocationCardComponent} from './location-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    LocationCardComponent
  ],
  imports: [
    SharedModule,
    MatGridListModule,
    MatListModule,
    OccupancyViewModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [
    LocationCardComponent
  ]
})
export class LocationCardModule { }
