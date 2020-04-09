import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'app-locate-button',
  templateUrl: './locate-button.component.html',
  styleUrls: ['./locate-button.component.scss']
})
export class LocateButtonComponent {

  constructor(private mapService: MapService) { }

  loadPosition(): void {
    this.mapService.updateRealGpsPosition();
  }
}
