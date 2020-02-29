import { SearchDataDestination, SearchData } from './../../models/searchData.model';
import { SetSearchDataAction } from './../../state/search/search.actions';
import { Store } from '@ngxs/store';
import { Component, OnInit, Input } from '@angular/core';

export interface ImageCard {
  title: string;
  img: string;
  link: string;
  prefillSearchData?: SearchData;
  canUpdateSearchData?: boolean;
}

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {

  @Input() cardContent: ImageCard;

  constructor(private store: Store) { }

  public prefillSearchData(): void {
    if (this.cardContent.canUpdateSearchData) {
      this.store.dispatch(new SetSearchDataAction(this.cardContent.prefillSearchData));
    }
  }
}
