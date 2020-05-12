import {Component, Input, OnDestroy, OnInit, ElementRef} from '@angular/core';
import {Location} from '../../generated/models/location';
import {Router} from '@angular/router';
import {LocationProviderService} from '../../core/services/location-provider.service';
import {LocationCardService} from '../../core/services/location-card.service';
import {Subscription} from 'rxjs';
import {FavoriteService} from 'src/app/core/services/favorite.service';
import {GpsService} from '../../core/services/gps.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit, OnDestroy {
  // leads to errors if private
  public distance$ = new Observable<number>();

  constructor(
    private router: Router,
    private locationsService: LocationProviderService,
    private locationCardService: LocationCardService,
    private favoriteService: FavoriteService,
    private hostElement: ElementRef,
  ) {
  }

  @Input() location: Location;

  hide = true;
  blur = false;
  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.locationCardService
        .getSelectedLocationCard()
        .subscribe((location) => {
          if (location !== null) {
            if (location.id !== null && location.id === this.location.id) {
              this.hide = false;
              this.blur = false;
              // wait until browser has resized the element after opening it
              // otherwise the scroll will not be calculated correctly
              setTimeout(() => {
                (this.hostElement.nativeElement as HTMLElement).scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }, 10);
            } else {
              this.hide = true;
              this.blur = true;
            }
          } else {
            this.hide = true;
            this.blur = false;
          }
        })
    );
    this.distance$ = this.locationsService.getDistanceToLocation(this.location);
  }

  showLocationCard() {
    if (this.hide) {
      this.locationCardService.setSelectedLocationCard(this.location);
    }
  }

  hideLocationCard() {
    if (!this.hide) {
      setTimeout(_ => this.locationCardService.setSelectedLocationCard(null), 10);
    }
  }

  toggleFavorite() {
    if (this.location.favorite) {
      this.favoriteService.deleteFavorite(this.location.id);
    } else {
      this.favoriteService.addFavorite(this.location.id);
    }
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
