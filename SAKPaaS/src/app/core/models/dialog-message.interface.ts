export interface IDialogMessage {
  messageKey: string;
  titleKey?: string;
  okButtonTextKey?: string;
  cancelButtonTextKey?: string;
}

export enum DialogMessageReturnTypes {
  OKAY, CANCELLED
}
