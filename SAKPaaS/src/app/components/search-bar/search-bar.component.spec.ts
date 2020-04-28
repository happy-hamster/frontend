import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchBarModule } from 'src/app/components/search-bar/search-bar.module';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogTestingModule,
        SearchBarModule,
        TranslateModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
