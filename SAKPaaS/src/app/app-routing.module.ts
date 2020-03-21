import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {OccupanyReportComponent} from "./components/occupany-report/occupany-report.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '*', redirectTo: ''},
  {path: 'home', redirectTo: ''},
  {path: 'reportOccupancy', component: OccupanyReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
