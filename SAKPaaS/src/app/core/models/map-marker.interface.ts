import { GpsCoordinates } from './gps-coordinates.interface';

export interface MapMarker extends GpsCoordinates {
  colorHex: string
}
