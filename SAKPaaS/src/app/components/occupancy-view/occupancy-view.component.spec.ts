import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyViewComponent } from './occupancy-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Occupancy } from 'src/app/generated/models';

describe('OccupancyViewComponent', () => {
  let component: OccupancyViewComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OccupancyViewComponent,
        TestWrapperComponent
      ],
      imports: [
        TranslateModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-test-wrapper-component',
  template: '<app-occupancy-view [occupancy]="occupancy" [showOccupancyCount]="true"></app-occupancy-view>'
})
class TestWrapperComponent {
  occupancy: Occupancy = {
    value: 0.42,
    count: 3,
    latestReport: '2020-04-13T15:25:36.97Z'
  };
}
