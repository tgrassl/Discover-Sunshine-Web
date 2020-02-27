import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Listing } from 'src/app/shared/models/listing.model';
import { SearchState } from 'src/app/shared/state/search/search.state';
import { ApplicationState, APPLICATION_STATE } from './../../shared/state/application/application.state';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {

  @Select(SearchState.listings) listings$: Observable<Listing[]>;

  private subs: Subscription[] = [];
  constructor(private store: Store) {}

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public identify(index, item): number {
    return item.id;
  }

  public isLoading(): boolean {
    return this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.PENDING;
  }

  public canShowLoadingCards(): boolean {
    return this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.INITIAL;
  }

  public canShowWarning(): boolean {
    const listings = this.store.selectSnapshot(SearchState.listings);
    return listings && listings.length < 1;
  }
}
