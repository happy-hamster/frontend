import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCardComponent } from './location-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LocationCardModule} from './location-card.module';
import {MatDialogTestingModule} from '../../shared/mat-dialog-testing.module';
import {Component} from '@angular/core';
import {Occupancy} from '../../generated/models/occupancy';
import {Location} from '../../generated/models/location';
import {LocationId} from '../../generated/models';
import {ListType} from '../../core/models/location-card.interface';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent
      ],
      imports: [
        LocationCardModule,
        RouterTestingModule,
        MatDialogTestingModule,
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
  template: '<app-location-card [location]="location" [listType]="listType"></app-location-card>'
})
class TestWrapperComponent {
  location: Location = {
    id: 2062223349,
    name: 'MockLaden1',
    details: {
      type: 'supermarket',
      openingHours: null,
      brand: null
    },
    coordinates: {
      latitude: 50.105127,
      longitude: 14.2648863
    },
    occupancy: {
      value: null,
      count: 0,
      latestReport: null
    },
    address: {
      country: '"DE"',
      city: null,
      postcode: null,
      street: null,
      housenumber: null
    }
  };
  listType: ListType.NEAR_BY;
}
