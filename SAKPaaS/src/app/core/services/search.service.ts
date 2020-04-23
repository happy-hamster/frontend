import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { LocationsService } from 'src/app/generated/services';
import { SnackBarService } from './snack-bar.service';
import { SnackBarTypes } from '../models/snack-bar.interface';
import { catchError, switchMap, filter, tap } from 'rxjs/operators';
import { LocationSearchResult } from 'src/app/generated/models';
import { IsLoadingService } from '@service-work/is-loading';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private isInSearch$ = new BehaviorSubject<boolean>(false);
  private searchResult$: Observable<LocationSearchResult>;
  private searchTerm$ = new BehaviorSubject<string>(null);

  constructor(
    private locationApiService: LocationsService,
    private snackBarService: SnackBarService,
    private isLoadingService: IsLoadingService
  ) {
    this.searchResult$ = this.searchTerm$.pipe(
      filter(searchTerm => !!searchTerm),
      tap(_ => this.isLoadingService.add({ key: 'searchLocations' })),
      switchMap(query => {
        return this.locationApiService.locationsSearchQueryGet({query}).pipe(
          catchError(error => {
            this.isLoadingService.remove({ key: 'searchLocations' });
            if (error.status === 404) {
              this.snackBarService.sendNotification({
                messageKey: 'snack-bar.search.not-found',
                type: SnackBarTypes.INFO
              });
            } else {
              this.snackBarService.sendNotification({
                messageKey: 'snack-bar.search.error',
                type: SnackBarTypes.ERROR
              });
            }
            return EMPTY;
          }));
        }
      ),
      tap(_ => {
        this.isLoadingService.remove({ key: 'searchLocations' });
      }),
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

  public triggerSearch(query: string): void {
    this.searchTerm$.next(query);
  }

  public triggerSearchIfChanges(query: string): void {
    if (this.searchTerm$.value !== query) {
      this.triggerSearch(query);
    }
  }
}
