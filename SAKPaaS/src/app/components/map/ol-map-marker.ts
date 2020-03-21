import { Feature } from 'ol';
import { MapMarker } from 'src/app/core/models/map-marker.interface';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { Style, Icon } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

export class OLMapMarker extends Feature {
  constructor(mapMarker: MapMarker) {
    super({
      geometry: new Point(olProj.fromLonLat([mapMarker.longitude, mapMarker.latitude])),
      color: mapMarker.colorHex
    });
    this.setStyle(OLMapMarker.markerStyle)
  }

  static markerStyle: Style = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: IconAnchorUnits.FRACTION,
      anchorYUnits: IconAnchorUnits.FRACTION,
      src: "assets/icons/marker.png",
      scale: 0.2
    })
  })

  static markerStyleSelected: Style = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: IconAnchorUnits.FRACTION,
      anchorYUnits: IconAnchorUnits.FRACTION,
      src: "assets/icons/marker.png",
      scale: 0.25
    })
  })
}
