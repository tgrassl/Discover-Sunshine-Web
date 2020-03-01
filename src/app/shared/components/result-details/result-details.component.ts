import { Amenity } from './../../models/amenity.model';
import { Store } from '@ngxs/store';
import { SearchState } from 'src/app/shared/state/search/search.state';
import { SearchData } from './../../models/searchData.model';
import { Listing } from 'src/app/shared/models/listing.model';
import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { getRating } from '../../util';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultDetailsComponent implements OnInit, OnChanges {

  @Input() listing: Listing;
  @Input() targetRef: SatPopover;

  public searchData: SearchData;
  public listingRating;
  
  private amentiyIconMap = {
    1: 'swimmer',
    2: 'tv-retro',
    3: 'wifi',
    4: 'temperature-minus',
    5: 'fire',
    6: 'parking-square',
    7: 'backpack',
    8: 'ban'
  };

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.listingRating = getRating(this.listing);
  }

  ngOnChanges(): void {
    this.searchData = this.store.selectSnapshot(SearchState.searchData);
  }

  public getAmenityIcon(amenity: Amenity): string {
    const icon = this.amentiyIconMap[amenity.id];
    return icon ? 'uil-' + icon : '';
  }
}
