import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LocationDetailsComponent} from './components/location-details/location-details.component';
import { OccupancyReportComponent } from 'src/app/components/occupancy-report/occupancy-report.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '*', redirectTo: ''},
  {path: 'home', redirectTo: ''},
  {path: 'reportOccupancy/:id', component: OccupancyReportComponent},
  {path: 'test', component: LocationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
