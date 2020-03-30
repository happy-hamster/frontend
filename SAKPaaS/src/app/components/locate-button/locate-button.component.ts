import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GpsService} from '../../core/services/gps.service';

@Component({
  selector: 'app-locate-button',
  templateUrl: './locate-button.component.html',
  styleUrls: ['./locate-button.component.scss']
})
export class LocateButtonComponent {

  constructor(private gpsService: GpsService) { }

  loadPosition(): void {
    this.gpsService.updateRealGpsPosition();
  }
}
