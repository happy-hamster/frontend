import { NgModule } from '@angular/core';
import { LocationDetailsComponent } from 'src/app/components/location-details/location-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { OccupancyViewModule } from 'src/app/components/occupancy-view/occupancy-view.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    LocationDetailsComponent
  ],
  imports: [
    SharedModule,
    MatGridListModule,
    MatListModule,
    OccupancyViewModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  exports: [
    LocationDetailsComponent
  ]
})
export class LocationDetailsModule { }
