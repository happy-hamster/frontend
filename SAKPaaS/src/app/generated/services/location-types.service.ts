/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LocationType } from '../models/location-type';

@Injectable({
  providedIn: 'root',
})
export class LocationTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation locationsTypesGet
   */
  static readonly LocationsTypesGetPath = '/locations/types';

  /**
   * Location Types
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationsTypesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationsTypesGet$Response(params?: {

  }): Observable<StrictHttpResponse<Array<LocationType>>> {

    const rb = new RequestBuilder(this.rootUrl, LocationTypesService.LocationsTypesGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LocationType>>;
      })
    );
  }

  /**
   * Location Types
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationsTypesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationsTypesGet(params?: {

  }): Observable<Array<LocationType>> {

    return this.locationsTypesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LocationType>>) => r.body as Array<LocationType>)
    );
  }

}
