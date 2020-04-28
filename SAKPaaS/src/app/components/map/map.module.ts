import { NgModule } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    SharedModule,
    MatProgressBarModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
