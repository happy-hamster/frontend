import { Component, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation?: Location = undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
