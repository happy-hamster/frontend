/* tslint:disable */
import { Coordinates } from './coordinates';
import { Location } from './location';

/**
 * The result for a search request
 */
export interface LocationSearchResult {
  coordinates?: Coordinates;

  /**
   * List of Locations around the search query
   */
  locations?: Array<Location>;
}
