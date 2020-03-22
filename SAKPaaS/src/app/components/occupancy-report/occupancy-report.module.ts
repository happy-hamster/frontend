import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OccupancyReportComponent } from 'src/app/components/occupancy-report/occupancy-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IsLoadingModule } from '@service-work/is-loading';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    OccupancyReportComponent,
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    IsLoadingModule,
    MatIconModule
  ],
  exports: [
    OccupancyReportComponent
  ]
})
export class OccupancyReportModule { }
