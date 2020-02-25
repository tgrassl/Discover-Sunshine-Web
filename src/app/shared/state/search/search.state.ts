import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { ErrorStateTransitionAction, PendingStateTransitionAction, SuccessStateTransitionAction } from '../application/application.actions';
import { GetListingsAction, SetSearchDataAction, SetListingsAction } from './search.actions';
import { Listing } from '../../models/listing.model';
import { Injectable } from '@angular/core';
import { SearchData } from '../../models/searchData.model';

export interface SearchStateModel {
  searchData?: SearchData;
  listings?: Listing[];
}

@State<SearchStateModel>({
  name: 'search',
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

  @Action(SetSearchDataAction)
  setSearchTerm(ctx: StateContext<SearchStateModel>, action: SetSearchDataAction): void {
    ctx.patchState({ searchData: action.searchData });
  }

  @Action(SetListingsAction)
  setListings(ctx: StateContext<SearchStateModel>, action: SetListingsAction): void {
    ctx.patchState({ listings: action.listings });
  }

  @Action(GetListingsAction)
  getVocabulary(ctx: StateContext<SearchStateModel>): void {
    ctx.dispatch(new PendingStateTransitionAction());
    const searchData = ctx.getState().searchData;
    this.dataService.getListings(searchData).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data) => {
        ctx.dispatch(new SetListingsAction(data));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }
}
