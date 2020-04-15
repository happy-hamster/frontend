import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateButtonComponent } from './locate-button.component';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { LocateButtonModule } from 'src/app/components/locate-button/locate-button.module';
import { TranslateModule } from '@ngx-translate/core';

describe('LocateButtonComponent', () => {
  let component: LocateButtonComponent;
  let fixture: ComponentFixture<LocateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogTestingModule,
        LocateButtonModule,
        TranslateModule.forRoot({})
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
