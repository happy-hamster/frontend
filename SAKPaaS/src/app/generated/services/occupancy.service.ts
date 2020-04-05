/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Location } from '../models/location';
import { LocationId } from '../models/location-id';
import { OccupancyReport } from '../models/occupancy-report';

@Injectable({
  providedIn: 'root',
})
export class OccupancyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation locationsIdOccupancyPost
   */
  static readonly LocationsIdOccupancyPostPath = '/locations/{id}/occupancy';

  /**
   * Add or remove current capacity.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationsIdOccupancyPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationsIdOccupancyPost$Response(params: {

    /**
     * id of the place
     */
    id: LocationId;
  
    /**
     * The estimated occupancy by the buyer
     */
    body: OccupancyReport
  }): Observable<StrictHttpResponse<Location>> {

    const rb = new RequestBuilder(this.rootUrl, OccupancyService.LocationsIdOccupancyPostPath, 'post');
    if (params) {

      rb.path('id', params.id);

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Location>;
      })
    );
  }

  /**
   * Add or remove current capacity.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationsIdOccupancyPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationsIdOccupancyPost(params: {

    /**
     * id of the place
     */
    id: LocationId;
  
    /**
     * The estimated occupancy by the buyer
     */
    body: OccupancyReport
  }): Observable<Location> {

    return this.locationsIdOccupancyPost$Response(params).pipe(
      map((r: StrictHttpResponse<Location>) => r.body as Location)
    );
  }

}
