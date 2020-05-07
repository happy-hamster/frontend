import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location';
import { Observable, of } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { BackgroundBlurService } from 'src/app/core/services/background-blur.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shouldBlurBackground$: Observable<boolean>;

  @ViewChild(MapComponent) mapComp: MapComponent;

  desktop = true;

  constructor(
    private backgroundBlurService: BackgroundBlurService,
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit() {
    this.shouldBlurBackground$ = this.backgroundBlurService.getBlur();
    this.desktop = this.breakpointObserver.isMatched('(min-width: 601px)');
  }
}
