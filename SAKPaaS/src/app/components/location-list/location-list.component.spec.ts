import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListComponent } from './location-list.component';
import { Component } from '@angular/core';
import { Location } from 'src/app/generated/models';
import { LocationListModule } from 'src/app/components/location-list/location-list.module';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent
      ],
      imports: [
        LocationListModule
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
  template: '<app-location-list [locations]="locations"></app-location-list>'
})
class TestWrapperComponent {
  locations: Location[] = [
    {
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
    },
    {
      id: 97633716,
      name: 'Mockladen2',
      details: {
        type: 'supermarket',
        openingHours: 'Mo-Sa 07:00-20:00; PH,Su off',
        brand: 'Penny'
      },
      coordinates: {
        latitude: 49.1699146,
        longitude: 12.2442584
      },
      occupancy: {
        value: null,
        count: 0,
        latestReport: null
      },
      address: {
        country: '"DE"',
        city: 'Mockhausen',
        postcode: '66666',
        street: 'Am Mockbrunnen',
        housenumber: '42'
      }
    }
  ];
}
