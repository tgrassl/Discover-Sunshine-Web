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
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Select } from '@ngxs/store';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchState } from '../../state/search/search.state';
import { Listing } from './../../models/listing.model';

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
  @ViewChild('map') map: GoogleMap;
  @ViewChildren('marker') marker: QueryList<MapMarker>;
  @Input() listings: Listing[] = [];

  public mapMarkers = [];
  public markerOptions = { draggable: false, icon: InteractiveGoogleMapComponent.DEFAULT_MARKER_ICON };
  public bounds: LatLngBounds = new google.maps.LatLngBounds();
  public mapOptions: google.maps.MapOptions = {
    minZoom: 3,
    maxZoom: 15,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    gestureHandling: 'greedy',
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.TOP_LEFT
    },
  };

  private center: LatLngLiteral = { lat: 47.279229, lng: 12 };
  private subs: Subscription[] = [];
  private listingMarker: MapMarker[] = [];

  public ngOnInit(): void {
    this.setFallBackListings();
    this.handleMarkerHovering();
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
        } else {
          this.listingMarker.map((marker: MapMarker) => {
            if (marker.getIcon() === InteractiveGoogleMapComponent.HOVER_MARKER_ICON) {
              const mapsMarker = marker._marker;
              mapsMarker.setIcon(InteractiveGoogleMapComponent.DEFAULT_MARKER_ICON);
              mapsMarker.setZIndex(mapsMarker.getZIndex() - InteractiveGoogleMapComponent.HOVER_INDEX);
            }
          });
        }
      }));
  }

  private getListingPosition(listing: Listing): LatLngLiteral {
    return {
      lat: listing.latitude,
      lng: listing.longitude
    };
  }

  public ngAfterViewInit(): void {
    this.checkAndFitBounds();

    this.subs.push(this.marker.changes.subscribe(marker => {
      if (marker) {
        this.listingMarker = marker.toArray();
      }
    }));
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
}
