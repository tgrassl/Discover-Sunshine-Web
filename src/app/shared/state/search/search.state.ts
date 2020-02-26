import { SearchData } from './../../models/searchData.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { ErrorStateTransitionAction, PendingStateTransitionAction, SuccessStateTransitionAction } from '../application/application.actions';
import { GetListingsAction, SetSearchDataAction, SetListingsAction, SetHighlightedListingAction } from './search.actions';
import { Listing } from '../../models/listing.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface SearchStateModel {
  searchData?: SearchData;
  listings?: Listing[];
  highlightedListing?: Listing;
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    highlightedListing: null
  }
})
@Injectable()
export class SearchState {

  constructor(private dataService: DataService) { }

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

  @Action(SetSearchDataAction)
  setSearchData(ctx: StateContext<SearchStateModel>, action: SetSearchDataAction): void {
    ctx.patchState({ searchData: action.searchData });
    ctx.dispatch(new GetListingsAction());
  }

  @Action(SetHighlightedListingAction)
  setHighlightedListing(ctx: StateContext<SearchStateModel>, action: SetHighlightedListingAction): void {
    ctx.patchState({ highlightedListing: action.listing });
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
