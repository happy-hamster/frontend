import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieProviderService {

  constructor(
    private cookieService: CookieService
  ) { }

  public getValue(key: string): string {
    return this.cookieService.get(key) || undefined;
  }

  public isCookieAlreadySet(key: string): boolean {
    return this.cookieService.check(key);
  }

  public areCookiesAllowed(): boolean {
    return this.isCookieAlreadySet('allow_cookies');
  }

  public allowCookies(): boolean {
    this.cookieService.set('allow_cookies', 'true', 365);
    return this.areCookiesAllowed();
  }

  public setCookie(key: string, value: string): boolean {
    if (!this.areCookiesAllowed()) {
      return false;
    }
    this.cookieService.set(key, value, 365);
    return true;
  }

  public forbidCookies(): boolean {
    this.cookieService.deleteAll();
    return this.areCookiesAllowed();
  }
}
