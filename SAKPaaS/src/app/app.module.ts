import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MapModule } from 'src/app/components/map/map.module';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { OccupanyReportComponent } from './components/occupany-report/occupany-report.component';
import { ApiModule } from 'src/app/generated/api.module';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OccupancyViewComponent } from './components/occupancy-view/occupancy-view.component';
import {MatCardModule} from "@angular/material/card";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationDetailsComponent,
    OccupanyReportComponent,
    OccupancyViewComponent,
    SearchBarComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: 'http://dev.robspot.de:8080/sakpaas/api/v1'}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MapModule,
    MatListModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
