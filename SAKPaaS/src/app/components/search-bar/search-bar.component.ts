import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, merge, of} from 'rxjs';
import {Location} from '../../generated/models/location';
import {LocationProviderService} from '../../core/services/location-provider.service';
import {map, switchMap} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl();
  locations$: Observable<Location[]>;

  @Output() locationEmitted = new EventEmitter<Location>();
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(
    private locationsService: LocationProviderService,
    private searchService: SearchService
    ) {}

  ngOnInit(): void {
    this.locations$ = this.locationsService.fetchLocations();
    this.searchControl.valueChanges.subscribe(value => {
      if (!value) {
        this.searchService.setIsInSearch(false);
      }
    });
  }

  triggerSearch(): void {
    if (this.searchControl.value) {
      this.searchService.triggerSearch(this.searchControl.value);
    }
  }

  triggerSearchIfChanges(): void {
    if (this.searchControl.value) {
      // timeout to prevent `triggerSearchifChanges()` from being called before `triggerSearch()`
      setTimeout(_ => {
        this.searchService.triggerSearchIfChanges(this.searchControl.value);
      }, 100);
    }
  }

  resetSearch(): void {
    this.searchService.setIsInSearch(false);
  }

  getDistance(location: Location): string {
    const distance = this.locationsService.getDistanceToLocation(location);
    if (distance === null) {
      return '';
    }
    let dist = '' + Math.round(distance);
    if (dist.length > 3) {
      dist = dist.slice(0, dist.length - 2);
      dist = dist.slice(0, dist.length - 1) + '.' + dist.slice(dist.length - 1, dist.length) + ' km';
    } else {
      dist = dist + ' m';
    }
    return '(' + dist + ')';
  }

  dismiss() {
    this.searchControl.setValue(null);
    this.autocomplete.closePanel();
    (document.activeElement as HTMLElement).blur();
  }
}
