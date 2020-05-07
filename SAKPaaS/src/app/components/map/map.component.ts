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
import { LocationCardService } from 'src/app/core/services/location-card.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private static opacityOfBlurredLocations = 0.6;
  private static animationDuration = 200;

  customMap: Map;
  markers = new Subject<OLMapMarker[]>();

  vectorLayerDefault: VectorLayer;
  vectorSourceDefault: VectorSource;
  vectorSourceSelected: VectorSource;
  selectControl: Select;

  isLoadingLocations: Observable<boolean>;
  closeSubject: Subject<null>;
  minimized = false;
  private subscriptions = new Subscription();

  constructor(
    private mapService: MapService,
    private locationService: LocationProviderService,
    private locationCardService: LocationCardService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.initOLMap();
    this.initZoomLevelAlert();

    this.isLoadingLocations = this.locationService.getLoadingLocationsState();

    if (!this.mapService.isInitial) {
      this.locationService.reloadLocations();
    }

    if (this.route.snapshot.queryParamMap.get('id')) {
      console.log('id: ' + this.route.snapshot.queryParamMap.get('id'));
      this.loadPositionFromLocation(+this.route.snapshot.queryParamMap.get('id'));
      this.mapService.isInitial = false;
    } else if (this.mapService.isInitial) {
      this.mapService.updateRealGpsPosition();
      this.mapService.isInitial = false;
    }

    if (!this.mapService.isInitial) {
      this.locationService.reloadLocations();
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
        filter(_ => this.mapService.getCurrentMapZoomLevel() > MapService.ZOOM_LIMIT)
      ).subscribe((next) => {
        this.vectorSourceDefault.clear();
        const markers = next.map((locations) => new OLMapMarker(locations));
        this.vectorSourceDefault.addFeatures(markers);
      })
    );

    this.subscriptions.add(
      this.locationCardService.getSelectedLocationCard().subscribe(location => {
        if (location === null) {
          this.selectControl.getFeatures().clear();
          this.vectorSourceSelected.clear();
          this.vectorLayerDefault.setOpacity(1);
        } else {
          this.vectorSourceSelected.clear();
          const newFeature = new OLMapMarker(location);
          this.vectorSourceSelected.addFeature(newFeature);
          this.vectorLayerDefault.setOpacity(MapComponent.opacityOfBlurredLocations);
          this.selectControl.getFeatures().clear();
          this.selectControl.getFeatures().push(newFeature);
          // pushes the zoom operation to the next cycle of the event loop to stop
          // it from interfering with displaying the newly selected feature
          setTimeout(() => {
            this.zoomToNewLocation(location);
          }, 0);
        }
      })
    );

    this.addRelAttributeToContributionAnchor();
  }

  private initOLMap() {
    this.vectorSourceDefault = new VectorSource({
      features: []
    });

    this.vectorSourceSelected = new VectorSource({
      features: []
    });

    this.vectorLayerDefault = new VectorLayer({
      source: this.vectorSourceDefault,
    });

    this.customMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayerDefault,
        new VectorLayer({
          source: this.vectorSourceSelected,
          opacity: 1
        })
      ]
    });

    this.registerEventListeners();
  }

  private registerEventListeners() {
    // this listener gets triggered when the user clicks on a marker
    this.selectControl = new Select({
      condition: click,
      style: null
    });

    this.customMap.addInteraction(this.selectControl);

    this.selectControl.on('select', (e) => {
      const target = e.selected[0] as OLMapMarker;
      console.log(target);
      if (!target) {
        this.locationCardService.setSelectedLocationCard(null);
        return;
      }
      this.locationCardService.setSelectedLocationCard(target.location);
    });

    // this listener is called after the user has zoomed/panned/rotated the map
    this.customMap.addEventListener('moveend', () => {
      const view = this.customMap.getView();

      this.mapService.setMapZoomLevel(view.getZoom(), false);

      const viewCenterCoords = olProj.toLonLat(view.getCenter());
      this.mapService.setMapCenter(PositionCoordinates.fromOLArray(viewCenterCoords), false);

      return false;
    });

    this.subscriptions.add(this.mapService.getMapCenterFiltered().subscribe(center => {
      this.customMap.getView().animate({
        center: center.toOLProjectionArray(),
        duration: MapComponent.animationDuration
      });
    }));

    this.subscriptions.add(this.mapService.getMapZoomLevelFiltered().subscribe(zoom => {
      this.customMap.getView().animate({
        zoom,
        duration: MapComponent.animationDuration
      });
    }));
  }

  private initZoomLevelAlert() {
    this.mapService.getMapZoomLevel().subscribe((zoomLevel) => {
      if (zoomLevel > MapService.ZOOM_LIMIT) {
        if (this.closeSubject) {
          this.closeSubject.next();
          this.closeSubject = null;
        }
      } else if (this.closeSubject == null) {
        this.closeSubject = new Subject<null>();
        // null if there is no snack bar presented by this component
        // otherwise contains a subject that is subscribed to by the snack bar and closes it when it emits
        this.vectorSourceDefault.clear();
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

  /*deselect(): void {
    this.selectEvent?.target.getFeatures().clear();
    this.selectEvent = null;
  }*/

  public zoomToNewLocation(location: Location): void {
    this.mapService.setMapCenter(PositionCoordinates.fromLocation(location));
    this.mapService.setMapZoomLevel(16);
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

  /**
   * function to add a rel attribute to the openlayers contribution anchor to prevent security vulnerabilities,
   * further informations: https://web.dev/external-anchors-use-rel-noopener/
   *
   * The contribution anchor is initialized asynchrous. So we add an observer to the div.ol-attribution
   *  if the div changes, we try to select the anchor and add the rel attribute. Afterwards we disconnect from the observer.
   */
  private addRelAttributeToContributionAnchor() {

    const div = document.querySelector('div.ol-attribution');

    const observer = new MutationObserver(_ => {
      const a = document.querySelector('div.ol-attribution a[target=_blank]');
      if (a) {
        a.setAttribute('rel', 'noreferrer');
        observer.disconnect();
      }
    });

    observer.observe(div, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.mapService.saveMapState();
    this.closeSubject?.next();
  }

  resize() {
    this.customMap.updateSize();
  }

  fillScreen(minimized: boolean) {
    this.minimized = minimized;
    window.setTimeout(() => { this.resize(); }, 100);
  }
}

