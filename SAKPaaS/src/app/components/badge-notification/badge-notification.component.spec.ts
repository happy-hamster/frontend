import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeNotificationComponent } from './badge-notification.component';

describe('BadgeNotificationComponent', () => {
  let component: BadgeNotificationComponent;
  let fixture: ComponentFixture<BadgeNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeNotificationComponent ]
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
