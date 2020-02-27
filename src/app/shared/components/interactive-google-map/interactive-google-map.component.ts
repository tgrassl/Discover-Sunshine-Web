import { isMobile } from './../../util';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { Select, Store } from '@ngxs/store';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchState } from '../../state/search/search.state';
import { Listing } from './../../models/listing.model';
import { ToggleMobileMapAction } from '../../state/search/search.actions';

@Component({
  selector: 'app-interactive-google-map',
  templateUrl: './interactive-google-map.component.html',
  styleUrls: ['./interactive-google-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveGoogleMapComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  public static DEFAULT_MARKER_ICON = 'assets/img/marker.png';
  public static HOVER_MARKER_ICON = 'assets/img/marker-selected.png';
  public static HOVER_INDEX = 9000;
  public static DEFAULT_ZOOM = 2;

  @Select(SearchState.highlightedListing) highlightedListing$: Observable<Listing>;
  @Input() listings: Listing[] = [];

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  @ViewChild('map') map: GoogleMap;
  @ViewChildren('marker') marker: QueryList<MapMarker>;

  public mapMarkers = [];
  public infoListing: Listing;
  public markerOptions = { draggable: false, icon: InteractiveGoogleMapComponent.DEFAULT_MARKER_ICON };
  public bounds: LatLngBounds = new google.maps.LatLngBounds();
  public mapOptions: google.maps.MapOptions = {
    minZoom: 3,
    maxZoom: 17,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    gestureHandling: 'greedy',
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: isMobile ? google.maps.ControlPosition.TOP_RIGHT : google.maps.ControlPosition.TOP_LEFT
    },
  };

  private center: LatLngLiteral = { lat: 47.279229, lng: 12 };
  private subs: Subscription[] = [];
  private listingMarker: MapMarker[] = [];

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.setFallBackListings();
    this.handleMarkerHovering();
  }

  public ngAfterViewInit(): void {
    this.checkAndFitBounds();

    this.subs.push(this.marker.changes.subscribe(marker => {
      if (marker) {
        this.listingMarker = marker.toArray();
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public ngOnChanges(): void {
    this.handleListingChange();
  }

  private handleListingChange(): void {
    if (this.listings) {
      this.listings.forEach(listing => {
        const listingPosition: LatLngLiteral = this.getListingPosition(listing);
        this.mapMarkers.push({
          id: listing.idlisting,
          position: listingPosition,
          options: {
            ...this.markerOptions,
            title: listing.headline
          }
        });
        this.bounds.extend(listingPosition);
      });

      this.checkAndFitBounds();
    } else {
      this.listings = [];
    }
  }

  private handleMarkerHovering(): void {
    this.subs.push(this.highlightedListing$
      .pipe(distinctUntilChanged())
      .subscribe((listing: Listing) => {
        if (listing) {
          this.setMarkerIcon(listing);
        } else {
          this.resetMarkerIcons();
        }
      }));
  }

  private setMarkerIcon(listing: Listing): void {
    this.listingMarker.forEach((marker: MapMarker) => {
      const markerPosition = marker.getPosition();
      if (markerPosition.lat() === listing.latitude && markerPosition.lng() === listing.longitude) {
        const mapsMarker = marker._marker;
        const markerIndex = mapsMarker.getZIndex();
        const newMarkerIndex = markerIndex ?
          markerIndex + InteractiveGoogleMapComponent.HOVER_INDEX :
          InteractiveGoogleMapComponent.HOVER_INDEX;

        mapsMarker.setIcon(InteractiveGoogleMapComponent.HOVER_MARKER_ICON);
        mapsMarker.setZIndex(newMarkerIndex);
      }
    });
  }

  private resetMarkerIcons(): void {
    this.listingMarker.map((marker: MapMarker) => {
      if (marker.getIcon() === InteractiveGoogleMapComponent.HOVER_MARKER_ICON) {
        const mapsMarker = marker._marker;
        mapsMarker.setIcon(InteractiveGoogleMapComponent.DEFAULT_MARKER_ICON);
        mapsMarker.setZIndex(mapsMarker.getZIndex() - InteractiveGoogleMapComponent.HOVER_INDEX);
      }
    });
  }

  private getListingPosition(listing: Listing): LatLngLiteral {
    return {
      lat: listing.latitude,
      lng: listing.longitude
    };
  }

  private setFallBackListings(): void {
    if (!this.listings) {
      this.listings = [];
    }
  }

  private checkAndFitBounds(): void {
    if (this.map) {
      if (this.bounds.isEmpty()) {
        this.map._googleMap.setCenter(this.center);
        this.map._googleMap.setZoom(InteractiveGoogleMapComponent.DEFAULT_ZOOM);
      } else {
        this.map.fitBounds(this.bounds);
      }
    }
  }

  public openInfoWindow(marker: MapMarker | any) {
    this.infoWindow.open(marker);
    this.infoWindow.position = marker.position;
    this.getMapListing(marker.id);
  }

  public getMapListing(id: number) {
    const selectedListing = this.listings.find(item => item.idlisting === id);
    this.infoListing = selectedListing;
  }

  public closeMap(): void {
    this.store.dispatch(new ToggleMobileMapAction());
  }
}
