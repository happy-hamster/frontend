import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OccupancyViewComponent } from 'src/app/components/occupancy-view/occupancy-view.component';



@NgModule({
  declarations: [
    OccupancyViewComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    OccupancyViewComponent
  ]
})
export class OccupancyViewModule { }
