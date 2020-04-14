import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { Location } from 'src/app/generated/models';
import { PositionCoordinates } from 'src/app/core/models/position-coordinates.model';

export class OLMapMarker extends Feature {


  static markerStyleUndefined: Style = OLMapMarker.markerStyleMaker('marker_0');
  static markerStyleEmpty: Style = OLMapMarker.markerStyleMaker('marker_1');
  static markerStyleMedium: Style = OLMapMarker.markerStyleMaker('marker_2');
  static markerStyleFull: Style = OLMapMarker.markerStyleMaker('marker_3');

  static markerStyleSelected: Style = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: IconAnchorUnits.FRACTION,
      anchorYUnits: IconAnchorUnits.FRACTION,
      src: 'assets/icons/marker.png',
      scale: 0.25
    })
  });

  public location: Location;

  constructor(locationMarker: Location) {
    super({
      geometry: new Point(PositionCoordinates.fromLocation(locationMarker).toOLProjectionArray()),
    });
    this.location = locationMarker;
    const occupancy = locationMarker.occupancy.value;
    if (occupancy == null || occupancy === undefined || isNaN(occupancy) || occupancy < 0) {
      this.setStyle(OLMapMarker.markerStyleUndefined);
    } else {
      const oc3 = occupancy * 3;
      if (oc3 < 1) {
        this.setStyle(OLMapMarker.markerStyleEmpty);
      } else if (oc3 < 2) {
        this.setStyle(OLMapMarker.markerStyleMedium);
      } else {
        this.setStyle(OLMapMarker.markerStyleFull);
      }
    }
  }

  static markerStyleMaker(iconName: string): Style {
    return new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: 'assets/icons/marker/' + iconName + '.png',
        scale: 0.15
      })
    });
  }

}
