import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LocationDetailsComponent} from "./components/location-details/location-details.component";


const routes: Routes = [
  {path: '', component: HomeComponent, children:[{
      path: 'locationDetails/:id', component: LocationDetailsComponent
    }]},
  {path: '*', redirectTo: ''},
  {path: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
