import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/generated/models';
import { Observable, Subscription } from 'rxjs';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { SearchService } from 'src/app/core/services/search.service';
import {LocationCardService} from '../../core/services/location-card.service';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.scss']
})
export class LocationPanelComponent implements OnInit, OnDestroy {

  hideSearchResults = true;
  locations$: Observable<Location[]>;
  favorites$: Observable<Location[]>;
  blur: boolean;
  subscriptions = new Subscription();

  minimized = false;
  @Output() minimizedForParent = new EventEmitter<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationProviderService,
    private searchService: SearchService,
    private locationCardService: LocationCardService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log('queryParams updated', queryParams);
      this.hideSearchResults = !queryParams.has('searchTerm');
    });

    this.locations$ = this.locationService.fetchLocations();

    this.favorites$ = this.favoriteService.getFavorites();

    this.subscriptions.add(
      this.locationCardService.getSelectedLocationCard().subscribe(
        locationCard => {
          this.blur = locationCard !== null;
          if (locationCard !== null) {
            this.minimized = false;
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  minimize() {
    if (this.minimized) {
      this.minimized = !this.minimized;
      window.setTimeout(() => {
        this.minimizedForParent.emit(this.minimized);
      }, 150);
    } else {
      this.minimizedForParent.emit(!this.minimized);
      window.setTimeout(() => {
        this.minimized = !this.minimized;
      }, 150);
    }
  }

  expandIfNeeded(event) {
    if (event) {
      if (this.minimized) {
        this.minimize();
      }
    }
  }
}
