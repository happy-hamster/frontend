import { Injectable } from '@angular/core';
import { OccupancyService } from 'src/app/generated/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OccupancyProviderService {

  constructor(
    private occupancyApiService: OccupancyService
  ) { }

  public checkIn(id: string): Observable<void> {
    return this.occupancyApiService.locationsIdCheckInPost({ id });
  }

  public checkOut(id: string): Observable<void> {
    return this.occupancyApiService.locationsIdCheckOutPost({ id });
  }
}
