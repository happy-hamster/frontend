import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDialogComponent } from './global-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalDialogModule } from 'src/app/components/global-dialog/global-dialog.module';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('GlobalDialogComponent', () => {
  let component: GlobalDialogComponent;
  let fixture: ComponentFixture<GlobalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GlobalDialogModule,
        TranslateModule.forRoot(),
        MatDialogTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
