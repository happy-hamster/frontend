import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import * as olProj from 'ol/proj';
import { defaults as defaultInteractions, Select } from 'ol/interaction';
import { MapService } from 'src/app/core/services/map.service';
import { click } from 'ol/events/condition';
import VectorSource from 'ol/source/Vector';
import { OLMapMarker } from './ol-map-marker';
import { Subject, Subscription, Observable, throwError, BehaviorSubject } from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import { LocationProviderService } from 'src/app/core/services/location-provider.service';
import { catchError, filter } from 'rxjs/operators';
import { Location } from 'src/app/generated/models';
import { SelectEvent } from 'ol/interaction/Select';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SnackBarTypes } from 'src/app/core/models/snack-bar.interface';
import { ActivatedRoute } from '@angular/router';
import { PositionCoordinates } from 'src/app/core/models/position-coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  // minimum zoom level to load/display any locations
  private static ZOOM_LIMIT = 11;



  @Output() locationEmitted = new EventEmitter<Location>();

  customMap: Map;
  markers = new Subject<OLMapMarker[]>();

  vectorSource: VectorSource;
  selectEvent: SelectEvent = null;

  isLoadingLocations: Observable<boolean>;

  closeSubject: Subject<null>;

  private subscriptions = new Subscription();

  constructor(
    private mapService: MapService,
    private locationService: LocationProviderService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.initOLMap();
    this.initZoomLevelAlert();

    this.isLoadingLocations = this.locationService.getLoadingLocationsState();

    if (this.mapService.isInitial) {
      this.loadGpsPosition();
      this.mapService.isInitial = false;
    }

    if (this.route.snapshot.queryParamMap.get('id')) {
      console.log('id: ' + this.route.snapshot.queryParamMap.get('id'));
      this.loadPositionFromLocation(+this.route.snapshot.queryParamMap.get('id'));
    }

    this.subscriptions.add(
      this.locationService.fetchLocations().pipe(
        catchError(err => {
          this.snackBarService.sendNotification({
            messageKey: 'snack-bar.map.error',
            type: SnackBarTypes.ERROR
          });
          return throwError(err);
        }),
        filter(_ => this.mapService.getCurrentMapZoomLevel() > MapComponent.ZOOM_LIMIT)
      ).subscribe((next) => {
        console.log('Fetched new locations');
        this.vectorSource.clear();
        const markers = next.map((locations) => new OLMapMarker(locations));
        this.vectorSource.addFeatures(markers);
      })
    );


  }

  private initOLMap() {
    this.vectorSource = new VectorSource({
      features: []
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
        center: olProj.fromLonLat([
          this.mapService.getCurrentMapCenter().longitude,
          this.mapService.getCurrentMapCenter().latitude
        ]),
        zoom: this.mapService.getCurrentMapZoomLevel()
      }),
    });

    this.registerEventListeners();
  }

  private registerEventListeners() {
    // this listener gets triggered when the user clicks on a marker
    const select = new Select({
      condition: click,
      style: null
    });

    this.customMap.addInteraction(select);

    select.on('select', (e) => {
      const target = e.selected[0] as OLMapMarker;
      if (!target) { return; }
      this.locationEmitted.emit(target.location);
      this.selectEvent = e;
    });

    // this listener is called after the user has zoomed/panned/rotated the map
    this.customMap.addEventListener('moveend', () => {
      const view = this.customMap.getView();
      const zoomLevel = view.getZoom();
      this.mapService.setMapZoomLevel(zoomLevel);

      // if (zoomLevel < MapComponent.ZOOM_LIMIT) { return false; }

      const viewCenterCoords = olProj.toLonLat(view.getCenter());
      this.mapService.setMapCenter(PositionCoordinates.fromOLArray(viewCenterCoords));

      return false;
    });
  }

  private initZoomLevelAlert() {
    this.mapService.getMapZoomLevel().subscribe((zoomLevel) => {
      if (zoomLevel > MapComponent.ZOOM_LIMIT) {
        if (this.closeSubject) {
          // forcing a reload
          // this.positionService.setMapCenter(this.positionService.getCurrentLocation());
          this.closeSubject.next();
          this.closeSubject = null;
        }
      } else if (this.closeSubject == null) {
        this.closeSubject = new Subject<null>();
        // null if there is no snack bar presented by this component
        // otherwise contains a subject that is subscribed to by the snack bar and closes it when it emits
        this.vectorSource.clear();
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.map.zoom',
          type: SnackBarTypes.INFO,
          closeObservable: this.closeSubject,
          big: false,
          hideCloseButton: true
        });
      }
    });
  }

  deselect(): void {
    this.selectEvent.target.getFeatures().clear();
    this.selectEvent = null;
  }

  public zoomToNewLocation(location: Location): void {
    this.customMap.getView().setCenter(olProj.fromLonLat([location.coordinates.longitude, location.coordinates.latitude]));
    this.customMap.getView().setZoom(16);
  }

  private loadPositionFromLocation(id: number) {
    this.subscriptions.add(
      this.locationService.fetchLocationById(id).pipe(
        catchError(err => {
          this.snackBarService.sendNotification({
            messageKey: 'snack-bar.map.not-found',
            type: SnackBarTypes.ERROR
          });
          return throwError(err);
        })
      ).subscribe((location) => {
        if (location.name) {
          document.title = 'HappyHamster - ' + location.name;
        }
        this.zoomToNewLocation(location);
      })
    );
  }

  private loadGpsPosition() {
    this.subscriptions.add(this.mapService.getDevicePosition().pipe(
      catchError(err => {
        this.snackBarService.sendNotification({
          messageKey: 'snack-bar.map.error',
          type: SnackBarTypes.ERROR
        });
        return throwError(err);
      })
    ).subscribe(gpsCoordinates => {
      this.customMap.getView().setCenter(olProj.fromLonLat([gpsCoordinates.longitude, gpsCoordinates.latitude]));
      this.customMap.getView().setZoom(15);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.closeSubject?.next();
  }
}

