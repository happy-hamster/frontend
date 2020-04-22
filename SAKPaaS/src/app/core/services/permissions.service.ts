import { Injectable } from '@angular/core';
import { GlobalDialogService } from './global-dialog.service';
import { DialogMessageReturnTypes } from '../models/dialog-message.interface';
import { CheckboxesDialog } from '../models/checkboxes-dialog.interface';
import { CookieProviderService } from './cookie-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private static COOKIE_PERMISSION_GPS = 'p_gps_granted';

  private currentPermissionsState: CheckboxesDialog;

  constructor(
    private dialogService: GlobalDialogService,
    private cookieService: CookieProviderService
  ) {
    this.currentPermissionsState = {
      cookiesAllowed: this.cookieService.areCookiesAllowed(),
      gpsAllowed: this.cookieService.isCookieAlreadySet(PermissionsService.COOKIE_PERMISSION_GPS)
    };
  }

  public async getPermissions(): Promise<CheckboxesDialog> {
    if (this.currentPermissionsState.cookiesAllowed) {
      return this.currentPermissionsState;
    }
    const dialogResult = await this.showDialog();
    this.currentPermissionsState = dialogResult;
    if (dialogResult.cookiesAllowed) {
      this.cookieService.allowCookies();
    } else {
      this.cookieService.forbidCookies();
    }
    this.cookieService.updateCookieIfAllowed(PermissionsService.COOKIE_PERMISSION_GPS, dialogResult.gpsAllowed);
    return this.currentPermissionsState;
  }

  private showDialog(): Promise<CheckboxesDialog> {
    return new Promise((resolve, _) => {
      this.dialogService.showDialog(
        {
          titleKey: 'dialog.permissions.title',
          messageKey: 'dialog.permissions.message',
          askForPermission: true,
          checkboxCookieTextKey: 'dialog.permissions.checkbox-cookie',
          checkboxGpsTextKey: 'dialog.permissions.checkbox-gps',
          cancelButtonTextKey: 'dialog.permissions.cancel-button',
          okButtonTextKey: 'dialog.permissions.ok-button'
        }
      ).subscribe((result) => {
        switch (result) {
          case DialogMessageReturnTypes.OKAY:
            resolve({ cookiesAllowed: true, gpsAllowed: true });
            break;
          case DialogMessageReturnTypes.CANCELLED:
            resolve({ cookiesAllowed: false, gpsAllowed: false });
            break;
          case DialogMessageReturnTypes.ONLY_COOKIES:
            resolve({ cookiesAllowed: true, gpsAllowed: false });
            break;
          case DialogMessageReturnTypes.ONLY_GPS:
            resolve({ cookiesAllowed: false, gpsAllowed: true });
            break;
        }
      });
    });
  }
}
