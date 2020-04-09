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

  toArray(): number[] {
    return [this.longitude, this.latitude];
  }


}
