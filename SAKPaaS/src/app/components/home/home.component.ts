import { Component, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location'
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation$: Observable<Location>;
  constructor() { }

  ngOnInit(): void {
  }

}
