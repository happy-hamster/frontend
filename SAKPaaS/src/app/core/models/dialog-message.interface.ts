export interface IDialogMessage {
  messageKey: string;
  titleKey?: string;
  askForPermission?: boolean;
  checkboxCookieTextKey?: string;
  checkboxGpsTextKey?: string;
  okButtonTextKey?: string;
  cancelButtonTextKey?: string;
}

export enum DialogMessageReturnTypes {
  OKAY,
  CANCELLED,
  ONLY_COOKIES,
  ONLY_GPS
}
