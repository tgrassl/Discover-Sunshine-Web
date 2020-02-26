import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input, OnChanges, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Select, Store } from '@ngxs/store';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { Observable, Subscription } from 'rxjs';
import { SearchState } from '../../state/search/search.state';
import { Listing } from './../../models/listing.model';
import { GetListingsAction } from './../../state/search/search.actions';
import { first, distinctUntilChanged } from 'rxjs/operators';

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

  @Select(SearchState.highlightedListing) highlightedListing$: Observable<Listing>;
  @ViewChild('map') map: GoogleMap;
  @ViewChildren('marker') marker: QueryList<MapMarker>;
  @Input() listings: Listing[];

  public mapMarkers = [];
  public markerOptions = { draggable: false, icon: InteractiveGoogleMapComponent.DEFAULT_MARKER_ICON };
  public center: LatLngLiteral;
  public bounds: LatLngBounds = new google.maps.LatLngBounds();
  private subs: Subscription[] = [];
  private listingMarker: MapMarker[] = [];

  public mapOptions: google.maps.MapOptions = {
    minZoom: 3,
    maxZoom: 15,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.TOP_LEFT
    },
  };

  public ngOnInit(): void {
    this.subs.push(this.highlightedListing$.pipe(distinctUntilChanged()).subscribe((listing: Listing) => {
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

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public ngOnChanges(): void {
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
    }
  }

  private getListingPosition(listing: Listing): LatLngLiteral {
    return {
      lat: listing.latitude,
      lng: listing.longitude
    };
  }

  public ngAfterViewInit(): void {
    this.map.fitBounds(this.bounds);

    this.subs.push(this.marker.changes.subscribe(marker => {
      if (marker) {
        this.listingMarker = marker.toArray();
      }
    }));
  }

  public handleBoundsChange(): void {
    //this.map.zoom = Math.min( 8, this.map.getZoom() );
  }
}
