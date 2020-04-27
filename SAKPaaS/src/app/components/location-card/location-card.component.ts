import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../generated/models/location';
import {Router} from '@angular/router';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {

  @Input() location: Location;

  hide = true;
  favorite = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggle() {
    this.hide = !this.hide;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  checkIn(location: Location): void {
    this.router.navigate(['reportOccupancy', location.id]);
  }
}
