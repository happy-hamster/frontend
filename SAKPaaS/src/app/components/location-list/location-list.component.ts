import {Component, OnInit, Input} from '@angular/core';
import {Location} from 'src/app/generated/models';
import {GpsService} from '../../core/services/gps.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  @Input() locations: Location[];
  @Input() isCloseToYouList?: boolean;

  constructor(
    private gpsService: GpsService
  ) {
  }

  ngOnInit(): void {
  }
}
