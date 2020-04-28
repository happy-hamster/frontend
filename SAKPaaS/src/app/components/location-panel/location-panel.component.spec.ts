import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPanelComponent } from './location-panel.component';
import { LocationPanelModule } from 'src/app/components/location-panel/location-panel.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('LocationPanelComponent', () => {
  let component: LocationPanelComponent;
  let fixture: ComponentFixture<LocationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        LocationPanelModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
