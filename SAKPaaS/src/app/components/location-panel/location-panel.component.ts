import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/generated/models';
import {Observable, Subscription} from 'rxjs';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { SearchService } from 'src/app/core/services/search.service';
import {ListType} from '../../core/models/location-card.interface';
import {LocationCardService} from '../../core/services/location-card.service';

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.scss']
})
export class LocationPanelComponent implements OnInit, OnDestroy {

  hideSearchResults = true;
  locations$: Observable<Location[]>;
  favoriteType = ListType.FAVORITES;
  searchType = ListType.SEARCH;
  nearByType = ListType.NEAR_BY;
  blur: boolean;
  subscriptions = new Subscription();

  mockLocationsForFavorites: Location[] = [
    {
      id: 2062223349,
      name: 'MockLaden1',
      details: {
        type: 'supermarket',
        openingHours: null,
        brand: null
      },
      coordinates: {
        latitude: 52.1038667,
        longitude: 14.2648863
      },
      occupancy: {
        value: null,
        count: 0,
        latestReport: null
      },
      address: {
        country: '"DE"',
        city: null,
        postcode: null,
        street: null,
        housenumber: null
      }
    },
    {
      id: 97633716,
      name: 'Mockladen2',
      details: {
        type: 'supermarket',
        openingHours: 'Mo-Sa 07:00-20:00; PH,Su off',
        brand: 'Penny'
      },
      coordinates: {
        latitude: 52.1699146,
        longitude: 14.2442584
      },
      occupancy: {
        value: null,
        count: 0,
        latestReport: null
      },
      address: {
        country: '"DE"',
        city: 'Beeskow',
        postcode: '15848',
        street: 'Breitscheidstraße',
        housenumber: '2'
      }
    }
  ];

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