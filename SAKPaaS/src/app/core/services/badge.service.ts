import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor() { }
}

export enum BadgeType {
  NEXT_LEVEL = 'next_level',
  NEXT_LEVEL_CLASS = 'next_level_class',
  REPORT = 'report',
  NEW_REPORT = 'new_report',
  TWO_SHOPS = 'two_shops',
  SHOP_FIRST_REPORT = 'shop_first_report',
  WEEK_1 = 'week_1',
  WEEK_3 = 'week_3',
  WEEK_FULL = 'week_full',
  WEEK_SPECIAL = 'week_special',
  TRUSTED_SHOP = 'trusted_shop',
  TRUSTED_USER = 'trusted_user'
}
