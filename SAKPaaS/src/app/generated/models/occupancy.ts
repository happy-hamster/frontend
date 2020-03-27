/* tslint:disable */
export interface Occupancy {

  /**
   * Number of datapoints used for the value calculation.
   */
  count: number;

  /**
   * Time of the latest report that was considered to calculate occupancy
   */
  latestReport?: null | string;

  /**
   * Occupancy in percent.
   */
  value: null | number;
}
