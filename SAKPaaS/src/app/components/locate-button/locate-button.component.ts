import {Component, OnInit} from '@angular/core';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'app-locate-button',
  templateUrl: './locate-button.component.html',
  styleUrls: ['./locate-button.component.scss']
})
export class LocateButtonComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.delay(200).then(r => this.loadPosition());
  }

  loadPosition(): void {
    this.mapService.centerMapToGpsCoordinates(true);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
