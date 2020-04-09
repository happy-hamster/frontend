import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PositionService } from '../../core/services/position.service';

@Component({
  selector: 'app-locate-button',
  templateUrl: './locate-button.component.html',
  styleUrls: ['./locate-button.component.scss']
})
export class LocateButtonComponent {

  constructor(private gpsService: PositionService) { }

  loadPosition(): void {
    this.gpsService.updateRealGpsPosition();
  }
}
