import { NgModule } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    SharedModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
