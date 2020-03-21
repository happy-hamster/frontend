import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyViewComponent } from './occupancy-view.component';

describe('OccupancyViewComponent', () => {
  let component: OccupancyViewComponent;
  let fixture: ComponentFixture<OccupancyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
