import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateButtonComponent } from './locate-button.component';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('LocateButtonComponent', () => {
  let component: LocateButtonComponent;
  let fixture: ComponentFixture<LocateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateButtonComponent ],
      imports: [
        MatDialogTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
