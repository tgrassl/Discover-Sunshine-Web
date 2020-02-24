import { GetVocabularyAction } from './search.actions';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { PendingStateTransitionAction, ErrorStateTransitionAction, SuccessStateTransitionAction } from '../application/application.actions';

export interface SearchStateModel {
  searchTerm?: string;
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    searchTerm: ''
  }
})
export class SearchState implements NgxsOnInit {

  constructor(private dataService: DataService) { }

  // @Selector()
  // static searchResults(state: SearchStateModel): VocabularyItem[] {
  //   return state.searchResults;
  // }

  @Selector()
  static searchTerm(state: SearchStateModel): string {
    return state.searchTerm;
  }

  ngxsOnInit(ctx?: StateContext<any>) {
    ctx.dispatch(new GetVocabularyAction());
  }

  // @Action(SetSearchTermAction)
  // setSearchTerm(ctx: StateContext<SearchStateModel>, action: SetSearchTermAction): void {
  //   ctx.patchState({ searchTerm: action.searchTerm });
  // }

  @Action(GetVocabularyAction)
  getVocabulary(ctx: StateContext<SearchStateModel>): void {
    ctx.dispatch(new PendingStateTransitionAction());
    this.dataService.getVocabulary().pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data) => {
        // ctx.dispatch(new SetVocabularyAction(data));
        // ctx.dispatch(new GetShowcasedWordAction());
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }
}
