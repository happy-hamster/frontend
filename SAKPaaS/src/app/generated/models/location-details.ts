/* tslint:disable */
import { LocationType } from './location-type';

/**
 * Locaiton details
 */
export interface LocationDetails {

  /**
   * Brand of the shop
   */
  brand?: null | string;

  /**
   * Opening hours of the shop
   */
  openingHours?: null | string;
  type?: LocationType;
}
