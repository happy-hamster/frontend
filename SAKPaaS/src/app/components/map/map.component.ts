import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import * as olProj from 'ol/proj';
import { defaults as defaultInteractions, Translate, Select } from 'ol/interaction';
import { GpsService } from 'src/app/core/services/gps.service';
import { click } from 'ol/events/condition';
import VectorSource from 'ol/source/Vector';
import { OLMapMarker } from './ol-map-marker';
import { Subject } from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import { MapMarker } from 'src/app/core/models/map-marker.interface';
import { Observable } from 'ol';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  customMap: Map;
  markers = new Subject<OLMapMarker[]>();

  vectorSource: VectorSource;

  constructor(
    private gpsService: GpsService,
    private locationService: LocationProviderService
  ) {
  }

  ngOnInit(): void {
    this.vectorSource = new VectorSource({
      features: []
    })

    this.customMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: this.vectorSource
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });

    const select = new Select({
      condition: click,
      style: OLMapMarker.markerStyleSelected
    });

    this.customMap.addInteraction(select);
    select.on('select', (e) => {
      console.log("selected")
      const target = e.target.getFeatures().item(0)

      console.log(target)
    })

    /*this.markers.subscribe((next) => {
      this.vectorSource.clear();
      this.vectorSource.addFeatures(next);
    })*/

    this.locationService.fetchLocations().subscribe((next) => {
      this.vectorSource.clear();
      const markers = next.map((l) => new OLMapMarker({
        longitude: l.longitude,
        latitude: l.latitude,
        colorHex: ""
      }));
      this.vectorSource.addFeatures(markers);
    })

    this.gpsService.getLocation().subscribe(gpsCoordinates => {
      console.log("Setting map center...")
      this.customMap.getView().setCenter(olProj.fromLonLat([gpsCoordinates.longitude, gpsCoordinates.latitude]));
      this.customMap.getView().setZoom(10);
    });

    const testMarker: MapMarker = {
      latitude: 49.496064,
      longitude: 8.4672512,
      colorHex: "ff0016"
    }

    this.markers.next([new OLMapMarker(testMarker)])
  }
}

