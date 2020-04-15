export class CheckboxesDialog {
    cookiesAllowed: boolean;
    gpsAllowed: boolean;

    constructor(
        cookiesAllowed: boolean,
        gpsAllowed: boolean
      ) {
        this.cookiesAllowed = cookiesAllowed;
        this.gpsAllowed = gpsAllowed;
      }
}
