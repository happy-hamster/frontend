import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { OccupancyViewModule } from 'src/app/components/occupancy-view/occupancy-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    SharedModule,
    OccupancyViewModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
