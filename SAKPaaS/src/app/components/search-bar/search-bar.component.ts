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
  filteredLocations$: Observable<Location[]>;

  @Output() locationEmitted = new EventEmitter<Location>();
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(private locationsService: LocationProviderService) {}

  ngOnInit(): void {
    this.filteredLocations$ = this.locationsService.fetchLocations()
      .pipe(
        switchMap(locations => merge(
          of(locations),
          this.searchControl.valueChanges.pipe(
            map(value => {
              if (!value) {
                return locations;
              }
              value = value.toLowerCase();
              return locations.filter(location => {
                if (!location.name) {
                  return false;
                } else {
                  return location.name.toLowerCase().includes(value);
                }
              });
            })
          )
        )
      )
    );
  }

  getDistance(location: Location): string {
    let dist = '' + Math.round(this.locationsService.getDistanceToLocation(location));
    if (dist.length > 3) {
      dist = dist.slice(0, dist.length - 2);
      dist = dist.slice(0, dist.length - 1) + '.' + dist.slice(dist.length - 1, dist.length) + ' km';
    } else {
      dist = dist + ' m';
    }
    return dist;
  }

  dismiss() {
    this.searchControl.setValue(null);
    this.autocomplete.closePanel();
    (document.activeElement as HTMLElement).blur();
  }
}
