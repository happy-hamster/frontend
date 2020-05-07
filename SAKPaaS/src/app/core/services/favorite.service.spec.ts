import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogTestingModule } from 'src/app/shared/mat-dialog-testing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
