export interface IDialogMessage {
  message: string;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
}

export enum DialogMessageReturnTypes {
  OKAY, CANCELLED
}
