import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, merge, of} from 'rxjs';
import {Location} from '../../generated/models/location';
import {LocationProviderService} from '../../core/services/location-provider.service';
import {map, switchMap} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

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

  constructor(private locationsService: LocationProviderService) {}

  ngOnInit(): void {
    this.locations$ = this.locationsService.fetchLocations();
  }

  triggerSearch(): void {
    console.log('Search was triggered');
    if (this.searchControl.value) {
      this.locationsService.querySearch(this.searchControl.value);
    }
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
