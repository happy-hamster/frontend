import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeNotificationComponent } from './badge-notification.component';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';

describe('BadgeNotificationComponent', () => {
  let component: BadgeNotificationComponent;
  let fixture: ComponentFixture<BadgeNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeNotificationComponent ],
      imports: [ MatDialogTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
