import { GpsCoordinates } from './gps-coordinates.interface';

export interface LocationsQuery extends GpsCoordinates {
    radius?: number;
}
