import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { LogoModule } from 'src/app/components/logo/logo.module';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LogoModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
