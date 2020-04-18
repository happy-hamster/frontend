import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OccupancyReportComponent } from 'src/app/components/occupancy-report/occupancy-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IsLoadingModule } from '@service-work/is-loading';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    OccupancyReportComponent,
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    OccupancyReportComponent
  ]
})
export class OccupancyReportModule { }
