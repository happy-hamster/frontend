import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundBlurService {

  private blurred$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  getBlur(): Observable<boolean> {
    return this.blurred$;
  }

  setBlur(value: boolean) {
    this.blurred$.next(value);
  }
}
