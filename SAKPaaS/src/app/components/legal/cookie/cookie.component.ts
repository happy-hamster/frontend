import { Component, OnInit } from '@angular/core';
import { CookieProviderService } from 'src/app/core/services/cookie-provider.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {

  areCookiesAllowed = false;

  constructor(
    private cookieService: CookieProviderService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.areCookiesAllowed = this.cookieService.areCookiesAllowed();
  }

  forbidCookies() {
    this.areCookiesAllowed = this.cookieService.forbidCookies();
    this.snackBarService.sendNotification({
      messageKey: 'snack-bar.cookies.forbidden',
      type: SnackBarTypes.INFO
    });
  }

  allowCookies() {
    this.areCookiesAllowed = this.cookieService.allowCookies();
    this.snackBarService.sendNotification({
      messageKey: 'snack-bar.cookies.allowed',
      type: SnackBarTypes.INFO
    });
  }

}
