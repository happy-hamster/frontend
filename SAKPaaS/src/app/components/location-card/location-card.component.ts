import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '../../generated/models/location';
import {Router} from '@angular/router';
import {LocationProviderService} from '../../core/services/location-provider.service';
import {LocationCardService} from '../../core/services/location-card.service';
import {Subscription} from 'rxjs';
import {ListType} from '../../core/models/location-card.interface';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit, OnDestroy {

  @Input() location: Location;
  @Input() listType: ListType;

  hide = true;
  blur = false;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private locationsService: LocationProviderService,
    private locationCardService: LocationCardService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.locationCardService.getSelectedLocationCard().subscribe(
        locationCard => {
          if (locationCard !== null) {
            if (
              locationCard.locationId !== null
              && locationCard.locationId === this.location.id
              && locationCard.listType === this.listType
            ) {
              this.hide = false;
              this.blur = false;
            } else {
              this.hide = true;
              this.blur = true;
            }
          } else {
            this.hide = true;
            this.blur = false;
          }
        }
      )
    );
  }

  showLocationCard() {
    if (this.hide) {
      this.locationCardService.setSelectedLocationCard({
        locationId: this.location.id,
        listType: this.listType
      });
    }
  }

  hideLocationCard() {
    if (!this.hide) {
      setTimeout(_ => this.locationCardService.setSelectedLocationCard(null), 10);
    }
  }

  toggleFavorite() {
    console.log('toggleFavorite()');
    if (this.location.favorite) {
      // this.favoriteService.deleteFavorite(this.location.id);
    } else {
      this.favoriteService.addFavorite(this.location.id);
    }
  }

  getDistanceString(): string {
    const distance = this.locationsService.getDistanceToLocation(this.location);
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
    return dist;
  }

  getOccupancyString(): string {
    return '';
  }

  checkIn(location: Location): void {
    this.router.navigate(['reportOccupancy', location.id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
