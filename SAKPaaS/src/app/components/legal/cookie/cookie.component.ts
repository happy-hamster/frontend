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
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.areCookiesAllowed = this.cookieService.areCookiesAllowed();
  }

  forbidCookies() {
    this.areCookiesAllowed = this.cookieService.forbidCookies();
    this.snackBarService.sendNotification({
      message: 'Wir speichern ab jetzt keine Cookies mehr in deinem Browser. Du kannst die Einstellung jederzeit wieder ändern',
      type: SnackBarTypes.INFO
    });
  }

  allowCookies() {
    this.areCookiesAllowed = this.cookieService.allowCookies();
    this.snackBarService.sendNotification({
      message: 'Danke für deine Einwilligung! :)',
      type: SnackBarTypes.INFO
    });
  }

}
