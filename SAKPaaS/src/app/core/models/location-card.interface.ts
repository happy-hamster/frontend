import {LocationId} from '../../generated/models/location-id';

export enum ListType {
  SEARCH,
  FAVORITES,
  NEAR_BY
}

export interface LocationCardInterface {
  locationId: LocationId;
  listType: ListType;
}
