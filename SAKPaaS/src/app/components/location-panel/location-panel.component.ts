import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/generated/models';
import { Observable, Subscription } from 'rxjs';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { SearchService } from 'src/app/core/services/search.service';
import { LocationCardService } from '../../core/services/location-card.service';

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.scss']
})
export class LocationPanelComponent implements OnInit, OnDestroy {

  hideSearchResults = true;
  locations$: Observable<Location[]>;
  blur: boolean;
  subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationProviderService,
    private searchService: SearchService,
    private locationCardService: LocationCardService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log('queryParams updated', queryParams);
      this.hideSearchResults = !queryParams.has('searchTerm');
    });

    this.locations$ = this.locationService.fetchLocations();

    this.subscriptions.add(
      this.locationCardService.getSelectedLocationCard().subscribe(
        locationCard => {
          this.blur = locationCard !== null;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
