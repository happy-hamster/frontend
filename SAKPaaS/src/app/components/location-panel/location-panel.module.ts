import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationPanelComponent } from 'src/app/components/location-panel/location-panel.component';
import { LocationListModule } from 'src/app/components/location-list/location-list.module';



@NgModule({
  declarations: [
    LocationPanelComponent
  ],
  imports: [
    SharedModule,
    LocationListModule
  ],
  exports: [
    LocationPanelComponent
  ]
})
export class LocationPanelModule { }
