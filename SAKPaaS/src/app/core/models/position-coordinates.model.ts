import * as olProj from 'ol/proj';
import { Location } from 'src/app/generated/models';


export class PositionCoordinates {
  longitude: number;
  latitude: number;

  constructor(
    longitude: number,
    latitude: number
  ) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  static fromOLArray(array: number[]): PositionCoordinates {
    if (array.length !== 2) {
      throw new Error(`${array} is not a valid OL Array. It should contain exactly two elements.`);
    }
    return new PositionCoordinates(array[0], array[1]);
  }

  static fromLocation(location: Location) {
    return new PositionCoordinates(location.coordinates.longitude, location.coordinates.latitude);
  }

  toArray(): number[] {
    return [this.longitude, this.latitude];
  }

  toOLProjectionArray(): number[] {
    return olProj.fromLonLat(this.toArray());
  }


}
