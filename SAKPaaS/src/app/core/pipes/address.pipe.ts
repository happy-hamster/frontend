import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/generated/models';
/*
 * returns address
*/
@Pipe({name: 'address'})
export class AddressPipe implements PipeTransform {
  transform(address: Address): string {
    if (!address?.street) {
      return null;
    }

    let erg = address.street;

    if (address.housenumber) {
      erg = erg + ' ' + address.housenumber;
    }
    if (address.postcode || address.city) {
      erg = erg + ', ';
    }
    if (address.postcode) {
      erg = erg + address.postcode + ' ';
    }
    if (address.city) {
      erg = erg + address.city;
    }
    return erg;
  }
}
