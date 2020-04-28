import { TestBed } from '@angular/core/testing';

import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { MapService } from './map.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({})
      ]
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
