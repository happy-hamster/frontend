import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OccupancyReportComponent } from 'src/app/components/occupancy-report/occupancy-report.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'reportOccupancy/:id', component: OccupancyReportComponent},
  {path: 'legal', loadChildren: () => import('src/app/components/legal/legal.module').then(m => m.LegalModule)},
  {path: 'impressum', redirectTo: 'legal'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
