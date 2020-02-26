import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Select, Store } from '@ngxs/store';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { Observable, Subscription } from 'rxjs';
import { SearchState } from '../../state/search/search.state';
import { Listing } from './../../models/listing.model';
import { GetListingsAction } from './../../state/search/search.actions';

@Component({
  selector: 'app-interactive-google-map',
  templateUrl: './interactive-google-map.component.html',
  styleUrls: ['./interactive-google-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveGoogleMapComponent implements OnChanges, AfterViewInit {

  @ViewChild('map') map: GoogleMap;
  @Input() listings: Listing[];

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
      position: google.maps.ControlPosition.TOP_LEFT
    },
  };

  public ngOnChanges(): void {
    if (this.listings) {
      this.listings.forEach(listing => {
        const listingPosition: LatLngLiteral = {
          lat: listing.latitude,
          lng: listing.longitude
        };
  
        this.markerPositions.push(listingPosition);
        this.bounds.extend(listingPosition);
      });
    }
  }

  public ngAfterViewInit(): void {
    this.map.fitBounds(this.bounds);
  }

  public handleBoundsChange(): void {
    //this.map.zoom = Math.min( 8, this.map.getZoom() );
  }
}
