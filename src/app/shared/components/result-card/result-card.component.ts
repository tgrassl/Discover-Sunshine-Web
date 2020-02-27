import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Listing } from './../../models/listing.model';
import { SetHighlightedListingAction } from './../../state/search/search.actions';
import { isMobile } from './../../util';

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

  public markAsFavourite(): void {
    this.isMarkedFavourite = !this.isMarkedFavourite;
  }

  public getTitle(): string {
    return this.listing ? this.listing.headline : '';
  }

  public getDetailLink(): string {
    return this.listing ? '/listing/' + this.listing.idlisting : '';
  }

  public setHiglighted(isHiglighted: boolean): void {
    if (!isMobile && !this.isInfoMode) {
      if (isHiglighted) {
        this.store.dispatch(new SetHighlightedListingAction(this.listing));
      } else {
        this.store.dispatch(new SetHighlightedListingAction(null));
      }
    }
  }
}
