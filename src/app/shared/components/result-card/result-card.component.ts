import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Listing } from './../../models/listing.model';
import { SetHighlightedListingAction } from './../../state/search/search.actions';
import { isMobile, getRating } from './../../util';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {

  @Input() listing: Listing;
  @Input() isLoading: boolean;
  @Input() isInfoMode: boolean;

  public isMarkedFavourite = false;

  constructor(private store: Store) { }

  public markAsFavourite(event): void {
    event.stopPropagation();
    this.isMarkedFavourite = !this.isMarkedFavourite;
  }

  public getListingRating(): any {
    return getRating(this.listing);
  }

  public getTitle(): string {
    return this.listing ? this.listing.headline : '';
  }

  public getDetailLink(): string {
    return this.listing ? '/listing/' + this.listing.id : '';
  }

  public setHiglighted(isHiglighted: boolean): void {
    if (!isMobile && !this.isInfoMode && !this.isLoading) {
      if (isHiglighted) {
        this.store.dispatch(new SetHighlightedListingAction(this.listing));
      } else {
        this.store.dispatch(new SetHighlightedListingAction(null));
      }
    }
  }

  public toggleDetails(popover: SatPopover): void {
    if (this.listing) {
      popover.toggle();
    }
  }
}
