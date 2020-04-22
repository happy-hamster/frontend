import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, EMPTY } from 'rxjs';
import { LocationsService } from 'src/app/generated/services';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { catchError, switchMap } from 'rxjs/operators';
import { LocationSearchResult } from 'src/app/generated/models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private isInSearch$ = new BehaviorSubject<boolean>(false);
  private searchResult$: Observable<LocationSearchResult>;
  private searchTerm$ = new Subject<string>();

  constructor(
    private locationApiService: LocationsService,
    private snackBarService: SnackBarService
  ) {
    this.searchResult$ = this.searchTerm$.pipe(
      switchMap(query => {
        return this.locationApiService.locationsSearchQueryGet({query}).pipe(
          catchError(_ => {
            this.snackBarService.sendNotification({
              messageKey: 'snack-bar.search.error',
              type: SnackBarTypes.ERROR
            });
            return EMPTY;
          }));
        }
      )
    );
  }

  public getSearchResult(): Observable<LocationSearchResult> {
    return this.searchResult$;
  }

  public getIsInSearch(): boolean {
    return this.isInSearch$.value;
  }
  public setIsInSearch(newValue: boolean): void {
    this.isInSearch$.next(newValue);
  }

  public querySearch(query: string): void {
    this.searchTerm$.next(query);
  }
}
