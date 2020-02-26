import { GetListingsAction } from './../../state/search/search.actions';
import { Observable, Subscription } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { Listing } from './../../models/listing.model';
import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { SearchState } from '../../state/search/search.state';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-interactive-google-map',
  templateUrl: './interactive-google-map.component.html',
  styleUrls: ['./interactive-google-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveGoogleMapComponent implements OnInit, OnDestroy, AfterViewInit {

  @Select(SearchState.listings) listings$: Observable<Listing[]>;
  @ViewChild('map') map: GoogleMap;

  public markerPositions: LatLngLiteral[] = [];
  public markerOptions = { draggable: false, icon: 'assets/img/marker.png' };
  public center: LatLngLiteral;
  public bounds: LatLngBounds = new google.maps.LatLngBounds();

  public mapOptions: google.maps.MapOptions = {
    minZoom: 3,
    maxZoom: 15,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
  };

  private subs: Subscription[] = [];

  constructor(private store: Store) {
    this.store.dispatch(new GetListingsAction());
  }

  public ngOnInit(): void {
    this.subs.push(this.listings$.subscribe(listings => {
      if (listings) {
        listings.forEach(listing => {
          const listingPosition: LatLngLiteral = {
            lat: listing.latitude,
            lng: listing.longitude
          };

          this.markerPositions.push(listingPosition);
          this.bounds.extend(listingPosition);
        });
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public ngAfterViewInit(): void {
    this.map.fitBounds(this.bounds);
  }

  public handleBoundsChange(): void {
    //this.map.zoom = Math.min( 8, this.map.getZoom() );
  }

  public setCenter(): void {
  }
}
