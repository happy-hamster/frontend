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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkIn(location: Location): void {
    this.router.navigate(['reportOccupancy', location.id]);
  }
}
