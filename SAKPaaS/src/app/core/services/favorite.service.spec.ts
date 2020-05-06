import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
