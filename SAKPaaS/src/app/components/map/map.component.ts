import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
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
import { Subject, Subscription, Observable, throwError } from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { map, catchError } from 'rxjs/operators';
import { Location } from 'src/app/generated/models';
import { SelectEvent } from 'ol/interaction/Select';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() locationEmitted = new EventEmitter<Location>();

  customMap: Map;
  markers = new Subject<OLMapMarker[]>();

  vectorSource: VectorSource;
  selectEvent: SelectEvent = null;

  isLoadingLocations: Observable<boolean>;

  constructor(
    private gpsService: GpsService,
    private locationService: LocationProviderService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.vectorSource = new VectorSource({
      features: []
    });
    this.isLoadingLocations = this.locationService.getLoadingLocationsState();

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.locationService.fetchLocationById(params.id).pipe(
          catchError(err => {
            this.snackBarService.sendNotification({
              message: 'Leider konnten wir deinen gesuchten Laden nicht finden :(',
              type: SnackBarTypes.ERROR
            });
            return throwError(err);
          })
        ).subscribe((location) => {
          this.zoomToNewLocation(location);
        });
      }
    });

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
        center: olProj.fromLonLat([this.gpsService.getCurrentLocation().longitude, this.gpsService.getCurrentLocation().latitude]),
        zoom: 6
      }),
    });

    const select = new Select({
      condition: click,
      style: null
    });

    this.customMap.addInteraction(select);

    select.on('select', (e) => {
      const target = e.selected[0] as OLMapMarker;
      if (!target) { return; }
      this.locationEmitted.emit(target.location);
      console.log(e.selected);
      this.selectEvent = e;
    });

    this.customMap.addEventListener('moveend', () => {
      this.locationService.updateLoadingState(true);
      const center = this.customMap.getView().getCenter();
      const centerLonLat = olProj.toLonLat(center);
      this.gpsService.setLocation({ longitude: centerLonLat[0], latitude: centerLonLat[1] });
      console.log(centerLonLat);
      return true;
    });

    this.locationService.fetchLocations().pipe(
      catchError(err => {
        this.locationService.updateLoadingState(false);
        this.snackBarService.sendNotification({
          message: 'Beim Aktualisieren der Karte ist ein Fehler aufgetreten. Sorry :(',
          type: SnackBarTypes.ERROR
        });
        return throwError(err);
      })
    ).subscribe((next) => {
      this.locationService.updateLoadingState(false);
      console.log('Fetched new locations');
      this.vectorSource.clear();
      const markers = next.map((l) => new OLMapMarker(l));
      this.vectorSource.addFeatures(markers);
    });

    this.gpsService.getLocation().pipe(
      catchError(err => {
        this.snackBarService.sendNotification({
          message: 'Beim Aktualisieren der Karte ist ein Fehler aufgetreten. Sorry :(',
          type: SnackBarTypes.ERROR
        });
        return throwError(err);
      })
    ).subscribe(gpsCoordinates => {
      if (gpsCoordinates.fromDevice) {
        this.customMap.getView().setCenter(olProj.fromLonLat([gpsCoordinates.longitude, gpsCoordinates.latitude]));
        this.customMap.getView().setZoom(15);
      }
    });
  }

  deselect(): void {
    this.selectEvent.target.getFeatures().clear();
    this.selectEvent = null;
  }

  public zoomToNewLocation(location: Location): void {
    this.customMap.getView().setCenter(olProj.fromLonLat([location.longitude, location.latitude]));
    this.customMap.getView().setZoom(16);
  }
}

