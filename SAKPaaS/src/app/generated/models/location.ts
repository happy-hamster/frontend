/* tslint:disable */
import { Address } from './address';
import { Coordinates } from './coordinates';
import { LocationDetails } from './location-details';
import { LocationId } from './location-id';
import { Occupancy } from './occupancy';

/**
 * A physical location which represents a supermarket or similar
 */
export interface Location {
  address: Address;
  coordinates: Coordinates;
  details?: LocationDetails;

  /**
   * Whether or not this Location is a favorite of the currently logged in user.
   * (Will be null if the user is not logged in.)
   */
  favorite: null | boolean;
  id: LocationId;
  name: string;
  occupancy: Occupancy;
}
