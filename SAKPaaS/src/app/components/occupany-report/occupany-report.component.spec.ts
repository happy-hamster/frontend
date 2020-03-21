import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupanyReportComponent } from './occupany-report.component';

describe('OccupanyReportComponent', () => {
  let component: OccupanyReportComponent;
  let fixture: ComponentFixture<OccupanyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupanyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
