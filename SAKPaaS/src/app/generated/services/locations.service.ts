/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Coordinates } from '../models/coordinates';
import { Location } from '../models/location';
import { LocationId } from '../models/location-id';
import { LocationSearchResult } from '../models/location-search-result';

@Injectable({
  providedIn: 'root',
})
export class LocationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation searchLocations
   */
  static readonly SearchLocationsPath = '/locations';

  /**
   * Searches for locations in the given range.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchLocations()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchLocations$Response(params: {

    /**
     * Latitude
     */
    coordinates: Coordinates;

  }): Observable<StrictHttpResponse<Array<Location>>> {

    const rb = new RequestBuilder(this.rootUrl, LocationsService.SearchLocationsPath, 'get');
    if (params) {

      rb.query('Coordinates', params.coordinates);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Location>>;
      })
    );
  }

  /**
   * Searches for locations in the given range.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchLocations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchLocations(params: {

    /**
     * Latitude
     */
    coordinates: Coordinates;

  }): Observable<Array<Location>> {

    return this.searchLocations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Location>>) => r.body as Array<Location>)
    );
  }

  /**
   * Path part for operation locationsIdGet
   */
  static readonly LocationsIdGetPath = '/locations/{id}';

  /**
   * Get details for a specific location.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationsIdGet$Response(params: {

    /**
     * id
     */
    id: LocationId;

  }): Observable<StrictHttpResponse<Location>> {

    const rb = new RequestBuilder(this.rootUrl, LocationsService.LocationsIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

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
   * Get details for a specific location.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationsIdGet(params: {

    /**
     * id
     */
    id: LocationId;

  }): Observable<Location> {

    return this.locationsIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Location>) => r.body as Location)
    );
  }

  /**
   * Path part for operation locationsSearchQueryGet
   */
  static readonly LocationsSearchQueryGetPath = '/locations/search/{query}';

  /**
   * Returns the Coordinate and Locations around the 'Search Query'.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationsSearchQueryGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationsSearchQueryGet$Response(params: {

    /**
     * Search query
     */
    query: string;

  }): Observable<StrictHttpResponse<LocationSearchResult>> {

    const rb = new RequestBuilder(this.rootUrl, LocationsService.LocationsSearchQueryGetPath, 'get');
    if (params) {

      rb.path('query', params.query);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LocationSearchResult>;
      })
    );
  }

  /**
   * Returns the Coordinate and Locations around the 'Search Query'.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationsSearchQueryGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationsSearchQueryGet(params: {

    /**
     * Search query
     */
    query: string;

  }): Observable<LocationSearchResult> {

    return this.locationsSearchQueryGet$Response(params).pipe(
      map((r: StrictHttpResponse<LocationSearchResult>) => r.body as LocationSearchResult)
    );
  }

}
