import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable } from 'rxjs';
import {Location} from '../../generated/models/location';
import {LocationProviderService} from '../../core/services/location-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private locationsService: LocationProviderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
    ) {}

  ngOnInit(): void {
    this.locations$ = this.locationsService.fetchLocations();

    if (this.activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchControl.setValue(this.activatedRoute.snapshot.queryParamMap.get('searchTerm'));
    }
  }

  triggerSearch(): void {
    this.router.navigate([], {
      queryParams: {
        searchTerm: this.searchControl.value || null
      }
    });
    if (this.searchControl.value) {
      this.searchService.triggerSearch(this.searchControl.value);
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
    (document.activeElement as HTMLElement).blur();
  }
}
