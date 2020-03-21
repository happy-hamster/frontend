import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MapModule } from 'src/app/components/map/map.module';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { OccupancyReportModule } from 'src/app/components/occupancy-report/occupancy-report.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MapModule,
    OccupancyReportModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
