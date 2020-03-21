import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Location} from "../../generated/models/location";
import {LocationProviderService} from "../../core/services/location-provider.service";
import {filter, map, startWith, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl();
  locations$: Observable<Location[]>;
  filteredLocations$: Observable<Location[]>;

  constructor(private locationsService: LocationProviderService) {
    this.locations$ = locationsService.fetchLocations(5000);
  }

  ngOnInit(): void {
    this.filteredLocations$ = this.searchControl.valueChanges.pipe(
      switchMap(value => {
        console.log("1"+value);
        if (value == '') {
          return this.locations$;
        }
        value = value.toLowerCase();
        return this.locations$.pipe(
          tap(e => console.log("e"+e)),
          map(locations => locations.filter(
            location => location.name.toLowerCase().includes(value)
          )),
          tap(e => console.log(e))
        )
      })
    );
    this.filteredLocations$.subscribe(item => {console.log("log: "+item)});
  }
}
