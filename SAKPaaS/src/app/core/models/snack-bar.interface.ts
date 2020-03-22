export enum SnackBarTypes {
    ERROR,
    SUCCESS
}

export interface ISnackBar {
    message: string;
    type: SnackBarTypes;
}
