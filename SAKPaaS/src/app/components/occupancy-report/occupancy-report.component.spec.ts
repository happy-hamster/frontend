import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyReportComponent } from './occupancy-report.component';

describe('OccupancyReportComponent', () => {
  let component: OccupancyReportComponent;
  let fixture: ComponentFixture<OccupancyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyReportComponent ]
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
