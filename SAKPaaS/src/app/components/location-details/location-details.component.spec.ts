import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailsComponent } from './location-details.component';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AddressPipe } from 'src/app/core/pipes/address.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { LocationDetailsModule } from 'src/app/components/location-details/location-details.module';
import { Location } from 'src/app/generated/models';

describe('LocationDetailsComponent', () => {
  let component: LocationDetailsComponent;
  let fixture: ComponentFixture<LocationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LocationDetailsModule,
        RouterTestingModule,
        TranslateModule.forRoot({})
      ],
      providers: [
        { provide: MatBottomSheetRef, useValue: {} },
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: of({
            id: 1,
            address: null,
            coordinates: { latitude: 0, longitude: 1},
            name: 'location_name',
            occupancy: { value: 0.42, count: 2}
          } as Location) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBe(false);
  });
});
