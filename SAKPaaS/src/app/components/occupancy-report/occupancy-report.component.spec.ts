import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyReportComponent } from './occupancy-report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('OccupancyReportComponent', () => {
  let component: OccupancyReportComponent;
  let fixture: ComponentFixture<OccupancyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyReportComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogTestingModule
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
