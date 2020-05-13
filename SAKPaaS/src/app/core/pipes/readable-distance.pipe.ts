import {Pipe, PipeTransform} from '@angular/core';

/*
 * Converts primitive distance to human readable format.
*/
@Pipe({name: 'readableDistance'})
export class ReadableDistancePipe implements PipeTransform {
  transform(distance: number): string {
    if (distance === null) {
      return '';
    }
    const dist = Math.round(distance);
    let distStr = '';
    if (('' + Math.floor(dist)).length > 3) {
      distStr = '' + (dist / 1000).toFixed(1) + ' km';
    } else {
      distStr = '' + Math.floor(distance) + ' m';
    }
    return distStr;
  }
}
