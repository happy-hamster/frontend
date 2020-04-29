import { NgModule } from '@angular/core';
import { LocationListComponent } from 'src/app/components/location-list/location-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LocationCardModule} from '../location-card/location-card.module';



@NgModule({
  declarations: [
    LocationListComponent
  ],
    imports: [
        SharedModule,
        LocationCardModule
    ],
  exports: [
    LocationListComponent
  ]
})
export class LocationListModule { }
