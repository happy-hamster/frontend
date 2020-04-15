export interface IDialogMessage {
  messageKey: string;
  titleKey?: string;
  checkboxCookieTextKey: string;
  checkboxGpsTextKey: string;
  okButtonTextKey?: string;
  cancelButtonTextKey?: string;
}

export enum DialogMessageReturnTypes {
  OKAY, CANCELLED, ONLYCOOKIES, ONLYGPS
}
