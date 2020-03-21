import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { Style, Icon } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { Location } from 'src/app/generated/models';

export class OLMapMarker extends Feature {

  public location: Location

  constructor(locationMarker: Location) {
    super({
      geometry: new Point(olProj.fromLonLat([locationMarker.longitude, locationMarker.latitude])),
    });
    this.location = locationMarker
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
