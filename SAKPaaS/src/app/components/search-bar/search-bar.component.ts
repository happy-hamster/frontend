import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Location} from '../../generated/models/location';
import {LocationProviderService} from '../../core/services/location-provider.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl();
  private locations: Location[];
  filteredLocations$: Observable<Location[]>;

  constructor(private locationsService: LocationProviderService) {}

  ngOnInit(): void {
    this.locationsService.fetchLocations(5000)
      .subscribe(locations => this.locations = locations);

    this.filteredLocations$ = this.searchControl.valueChanges.pipe(
      map(value => {
        value = value.toLowerCase();
        return this.locations.filter(
          location => location.name.toLowerCase().includes(value)
        );
      })
    );
  }
}
