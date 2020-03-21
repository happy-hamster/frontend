import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import * as olProj from 'ol/proj';
import { defaults as defaultInteractions, Translate } from 'ol/interaction';
import { GpsService } from 'src/app/core/services/gps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  customMap: Map;

  constructor(
    private gpsService: GpsService,
  ) {
  }

  ngOnInit(): void {
    this.customMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });

    console.log(this.customMap.getInteractions())

    this.gpsService.getLocation().subscribe(gpsCoordinates => {
      console.log("Setting map center...")
      this.customMap.getView().setCenter(olProj.fromLonLat([gpsCoordinates.longitude, gpsCoordinates.latitude]));
      this.customMap.getView().setZoom(10);
    });
  }
}

