import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieProviderService {

  private static COOKIE_PERMISSION_COOKIE = 'p_cookie_granted';

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
    return this.isCookieAlreadySet(CookieProviderService.COOKIE_PERMISSION_COOKIE);
  }

  public allowCookies(): boolean {
    this.cookieService.set(CookieProviderService.COOKIE_PERMISSION_COOKIE, 'true', 365);
    return this.areCookiesAllowed();
  }

  public setCookie(key: string, value: string): boolean {
    if (!this.areCookiesAllowed()) {
      return false;
    }
    this.cookieService.set(key, value, 365);
    return true;
  }

  public updateCookieIfAllowed(key: string, state: boolean): boolean {
    if (!this.areCookiesAllowed()) {
      return false;
    }
    if (state) {
      this.cookieService.set(key, '+', 365);
    } else {
      this.cookieService.delete(key);
    }
    return true;
  }

  public forbidCookies(): boolean {
    this.cookieService.deleteAll();
    return this.areCookiesAllowed();
  }
}
