import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, merge, of} from 'rxjs';
import {Location} from '../../generated/models/location';
import {LocationProviderService} from '../../core/services/location-provider.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl();
  filteredLocations$: Observable<Location[]>;

  @Output() locationEmitted = new EventEmitter<Location>();

  constructor(private locationsService: LocationProviderService) {}

  ngOnInit(): void {
    this.filteredLocations$ = this.locationsService.fetchLocations(5000)
      .pipe(
        switchMap(locations => merge(
          of(locations),
          this.searchControl.valueChanges.pipe(
            map(value => {
              value = value.toLowerCase();
              return locations.filter(location => {
                if (!location.name) {
                  return false
                } else {
                  return location.name.toLowerCase().includes(value)
                }
              });
            })
          )
        )
      )
    );
  }
}
