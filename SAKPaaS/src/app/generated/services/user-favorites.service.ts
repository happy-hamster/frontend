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

@Injectable({
  providedIn: 'root',
})
export class UserFavoritesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usersSelfFavoritesGet
   */
  static readonly UsersSelfFavoritesGetPath = '/users/self/favorites';

  /**
   * List all favorite locations for the currently logged in user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersSelfFavoritesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersSelfFavoritesGet$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Location>>> {

    const rb = new RequestBuilder(this.rootUrl, UserFavoritesService.UsersSelfFavoritesGetPath, 'get');
    if (params) {


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
   * List all favorite locations for the currently logged in user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersSelfFavoritesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersSelfFavoritesGet(params?: {

  }): Observable<Array<Location>> {

    return this.usersSelfFavoritesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Location>>) => r.body as Array<Location>)
    );
  }

  /**
   * Path part for operation addFavorite
   */
  static readonly AddFavoritePath = '/users/self/favorites/{id}';

  /**
   * Add a favorite by location id for the currently logged in user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  addFavorite$Response(params: {

    /**
     * id of the location
     */
    id: LocationId;

  }): Observable<StrictHttpResponse<Location>> {

    const rb = new RequestBuilder(this.rootUrl, UserFavoritesService.AddFavoritePath, 'post');
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
   * Add a favorite by location id for the currently logged in user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addFavorite(params: {

    /**
     * id of the location
     */
    id: LocationId;

  }): Observable<Location> {

    return this.addFavorite$Response(params).pipe(
      map((r: StrictHttpResponse<Location>) => r.body as Location)
    );
  }

  /**
   * Path part for operation deleteFavorite
   */
  static readonly DeleteFavoritePath = '/users/self/favorites/{id}';

  /**
   * Remove a favorite by location id for the currently logged in user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavorite$Response(params: {

    /**
     * id of the location
     */
    id: LocationId;

  }): Observable<StrictHttpResponse<Location>> {

    const rb = new RequestBuilder(this.rootUrl, UserFavoritesService.DeleteFavoritePath, 'delete');
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
   * Remove a favorite by location id for the currently logged in user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavorite(params: {

    /**
     * id of the location
     */
    id: LocationId;

  }): Observable<Location> {

    return this.deleteFavorite$Response(params).pipe(
      map((r: StrictHttpResponse<Location>) => r.body as Location)
    );
  }

}
