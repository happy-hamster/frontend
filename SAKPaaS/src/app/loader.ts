import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/generated/api-configuration';

/**
 * loads a config file with the api endpoint
 *
 * format:
 * {
 *    "rootUrl": "string"
 * }
 *
 * When developing, the file does not exist. A default value is taken
 */
export function load(http: HttpClient, config: ApiConfiguration): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get('./config/config.json')
         .pipe(
           map((x: any) => {
             config.rootUrl = x.rootUrl + '/v1';
             resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             if (x.status !== 404) {
               resolve(false);
             }
             config.rootUrl = 'https://api.happyhamster.org/v1';
             resolve(true);
             return of({});
           })
         ).subscribe();
    });
  };
}
