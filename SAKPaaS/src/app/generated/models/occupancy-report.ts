/* tslint:disable */

/**
 * Occupancy report to send
 */
export interface OccupancyReport {

  /**
   * Type of the client which reported the occupancy
   */
  clientType: 'IOT' | 'WEB_APP';

  /**
   * Occupancy
   */
  occupancy: number;
}
