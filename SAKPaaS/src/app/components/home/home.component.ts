import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location';
import { Observable, of } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { BackgroundBlurService } from 'src/app/core/services/background-blur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shouldBlurBackground$: Observable<boolean>;

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor(
    private backgroundBlurService: BackgroundBlurService,
  ) { }

  ngOnInit() {
    this.shouldBlurBackground$ = this.backgroundBlurService.getBlur();
  }
}
