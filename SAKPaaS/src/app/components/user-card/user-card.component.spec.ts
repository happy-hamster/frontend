import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      imports: [
        TranslateModule.forRoot({}),
        MatDialogTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
