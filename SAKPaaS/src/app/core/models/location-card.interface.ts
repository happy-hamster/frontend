import { Location } from '../../generated/models/location';

export enum ListType {
  SEARCH,
  FAVORITES,
  NEAR_BY
}

export interface LocationCardInterface {
  location: Location;
  listType: ListType;
}
