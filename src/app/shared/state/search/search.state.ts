import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Listing } from '../../models/listing.model';
import { DataService } from '../../services/data.service';
import { ErrorStateTransitionAction, PendingStateTransitionAction, SuccessStateTransitionAction } from '../application/application.actions';
import { SearchData } from './../../models/searchData.model';
import {
  GetListingsAction,
  SetHighlightedListingAction,
  SetListingsAction,
  SetSearchDataAction,
  ToggleMobileMapAction
} from './search.actions';

export interface SearchStateModel {
  searchData?: SearchData;
  listings?: Listing[];
  highlightedListing?: Listing;
  mobileMapActive: boolean;
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    highlightedListing: null,
    mobileMapActive: false,
  }
})
@Injectable()
export class SearchState {

  constructor(private dataService: DataService, private activeRoute: ActivatedRoute) { }

  @Selector()
  static listings(state: SearchStateModel): Listing[] {
    return state.listings;
  }

  @Selector()
  static searchData(state: SearchStateModel): SearchData {
    return state.searchData;
  }

  @Selector()
  static highlightedListing(state: SearchStateModel): Listing {
    return state.highlightedListing;
  }

  @Selector()
  static mobileMapActive(state: SearchStateModel): boolean {
    return state.mobileMapActive;
  }

  @Action(SetSearchDataAction)
  setSearchData(ctx: StateContext<SearchStateModel>, action: SetSearchDataAction): void {
    ctx.patchState({ searchData: action.searchData });
    ctx.dispatch(new GetListingsAction());
  }

  @Action(SetHighlightedListingAction)
  setHighlightedListing(ctx: StateContext<SearchStateModel>, action: SetHighlightedListingAction): void {
    ctx.patchState({ highlightedListing: action.listing });
  }

  @Action(ToggleMobileMapAction)
  toggleMobileMap(ctx: StateContext<SearchStateModel>): void {
    const route: any = this.activeRoute;
    const currPath: string = route._routerState.snapshot.url;

    if (currPath.includes('map')) {
      const currentState = ctx.getState().mobileMapActive;
      ctx.patchState({ mobileMapActive: !currentState });
    } else {
      ctx.patchState({ mobileMapActive: false });
    }
  }

  @Action(SetListingsAction)
  setListings(ctx: StateContext<SearchStateModel>, action: SetListingsAction): void {
    ctx.patchState({ listings: action.listings });
  }

  @Action(GetListingsAction)
  getListings(ctx: StateContext<SearchStateModel>): void {
    ctx.dispatch(new PendingStateTransitionAction());
    const searchData: SearchData = ctx.getState().searchData;
    this.dataService.getListings(searchData).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data: Listing[]) => {
        ctx.dispatch(new SetListingsAction(data));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }
}
