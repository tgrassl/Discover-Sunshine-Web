import { SetHighlightedListingAction } from './../../state/search/search.actions';
import { Store } from '@ngxs/store';
import { Listing } from './../../models/listing.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {

  @Input() listing: Listing;
  @Input() isLoading: Listing;

  public isMarkedFavourite = false;
  
  constructor(private store: Store) { }

  public getRating(): string[] {
    const stars = [];
    const starsFull = Math.floor(this.listing.averageRating);
    const starsRemaining = this.listing.averageRating - starsFull;
    for (let i = 0; i < starsFull; i++) {
      stars.push('star');
    }

    if (starsRemaining >= 0.5) {
      stars.push('star_half');
    }

    return stars;
  }

  public markAsFavourite() {
    this.isMarkedFavourite = !this.isMarkedFavourite;
  }

  public setHiglighted(isHiglighted: boolean) {
    if (isHiglighted) {
      this.store.dispatch(new SetHighlightedListingAction(this.listing));
    } else {
      this.store.dispatch(new SetHighlightedListingAction(null));
    }
  }
}
