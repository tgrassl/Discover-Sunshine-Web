import { Listing } from './../../models/listing.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {

  @Input() listing: Listing;
  @Input() isLoading: Listing;

  public isMarkedFavourite = false;
  
  constructor() { }

  ngOnInit(): void {
  }

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

}
