import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { SetUserAction, LoginAction } from './auth.actions';

export interface AuthStateModel {
  user: User;
  isLoggedIn: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
})
@Injectable()
export class AuthState {

  constructor(private dataService: DataService) { }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  @Action(SetUserAction)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUserAction): void {
    ctx.patchState({ user: action.user });
  }

  @Action(LoginAction)
  loginUser(ctx: StateContext<AuthStateModel>): void {
    // ctx.dispatch(new PendingStateTransitionAction());
    // const searchData = ctx.getState().searchData;
    // this.dataService.getListings(searchData).pipe(
    //   catchError(err => {
    //     ctx.dispatch(new ErrorStateTransitionAction());
    //     return throwError(err);
    //   }))
    //   .subscribe((data) => {
    //     ctx.dispatch(new SetListingsAction(data));
    //     ctx.dispatch(new SuccessStateTransitionAction());
    //   });
  }
}
