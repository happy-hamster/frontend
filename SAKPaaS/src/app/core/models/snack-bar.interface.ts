import { Observable } from 'rxjs';

export enum SnackBarTypes {
  ERROR,
  SUCCESS,
  INFO
}

export interface ISnackBar {
  message: string;
  type: SnackBarTypes;
  closeObservable?: Observable<null>;
}
