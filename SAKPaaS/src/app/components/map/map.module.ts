import { NgModule } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
