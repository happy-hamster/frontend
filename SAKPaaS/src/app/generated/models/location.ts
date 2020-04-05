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
  id: LocationId;
  name: string;
  occupancy: Occupancy;
}
