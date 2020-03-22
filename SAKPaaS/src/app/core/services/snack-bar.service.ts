import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ISnackBar } from 'src/app/core/models/snack-bar.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private notification$ = new Subject<ISnackBar>();

  constructor() { }

  public sendNotification(notification: ISnackBar): void {
    this.notification$.next(notification);
  }

  public getNotification(): Observable<ISnackBar> {
    return this.notification$;
  }
}
