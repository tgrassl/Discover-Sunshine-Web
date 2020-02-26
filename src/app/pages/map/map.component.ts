import { ApplicationState, APPLICATION_STATE } from './../../shared/state/application/application.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SearchState } from 'src/app/shared/state/search/search.state';
import { Observable, Subscription } from 'rxjs';
import { Listing } from 'src/app/shared/models/listing.model';
import { GetListingsAction } from 'src/app/shared/state/search/search.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @Select(SearchState.listings) listings$: Observable<Listing[]>;

  private subs: Subscription[] = [];
  constructor(private store: Store) {
    //TODO remove later
    this.store.dispatch(new GetListingsAction());
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public identify(index, item) {
    return item.id;
  }

  public isLoading() {
    return this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.PENDING;
  }

}
