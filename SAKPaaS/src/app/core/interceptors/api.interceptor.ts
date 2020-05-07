import { Injectable, Provider, forwardRef } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthKeycloakService } from '../services/auth-keycloak.service';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private token$: Observable<string>;

  constructor(private authService: AuthKeycloakService) {
    this.token$ = authService.getToken();
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    return this.token$.pipe(switchMap(token => {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
      }
      return next.handle(req);
    }));

  }
}
