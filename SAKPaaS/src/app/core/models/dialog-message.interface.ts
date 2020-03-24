export interface IDialogMessage {
  message: string;
  header?: string;
  okButtonText?: string;
  cancelButtonText?: string;
}

export enum DialogMessageReturnTypes {
  OKAY, CANCELLED
}
