import {Component, Input, OnInit} from '@angular/core';
import { Location } from '../../generated/models/location'

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;
  constructor() { }

  ngOnInit(): void {
  }

}
