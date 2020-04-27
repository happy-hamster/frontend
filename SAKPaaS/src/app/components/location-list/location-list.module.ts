import { NgModule } from '@angular/core';
import { LocationListComponent } from 'src/app/components/location-list/location-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LocationDetailsModule} from '../location-card/location-card.module';



@NgModule({
  declarations: [
    LocationListComponent
  ],
    imports: [
        SharedModule,
        LocationDetailsModule
    ],
  exports: [
    LocationListComponent
  ]
})
export class LocationListModule { }
