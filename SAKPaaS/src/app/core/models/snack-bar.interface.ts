import { Observable } from 'rxjs';

export enum SnackBarTypes {
  ERROR,
  SUCCESS,
  INFO
}

export interface ISnackBar {
  messageKey: string;
  valuesForMessage?: { [key: string]: string };
  type: SnackBarTypes;
  closeObservable?: Observable<null>;
  big?: boolean;
  hideCloseButton?: boolean;
}

export interface ISnackBarInternal extends ISnackBar {
  closed?: boolean;
}
