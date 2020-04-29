import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/generated/models';
import {ListType} from '../../core/models/location-card.interface';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  @Input() locations: Location[];
  @Input() listType: ListType;

  constructor() { }

  ngOnInit(): void {
  }

}
