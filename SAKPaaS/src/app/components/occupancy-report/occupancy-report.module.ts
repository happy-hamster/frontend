import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OccupancyReportComponent } from 'src/app/components/occupancy-report/occupancy-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    OccupancyReportComponent,
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  exports: [
    OccupancyReportComponent
  ]
})
export class OccupancyReportModule { }
