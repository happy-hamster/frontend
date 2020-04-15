import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyReportComponent } from './occupancy-report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OccupancyReportModule } from 'src/app/components/occupancy-report/occupancy-report.module';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { TranslateModule } from '@ngx-translate/core';

describe('OccupancyReportComponent', () => {
  let component: OccupancyReportComponent;
  let fixture: ComponentFixture<OccupancyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        OccupancyReportModule,
        MatDialogTestingModule,
        TranslateModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
