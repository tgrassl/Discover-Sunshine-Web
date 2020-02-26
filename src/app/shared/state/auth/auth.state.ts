import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as bcrypt from 'bcryptjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { PendingStateTransitionAction } from '../application/application.actions';
import { ErrorStateTransitionAction, SuccessStateTransitionAction } from './../application/application.actions';
import { GetUserAction, LoginAction, RegisterAction, SetUserAction, LogoutAction } from './auth.actions';

export interface AuthStateModel {
  user?: User;
  isLoggedIn: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoggedIn: false,
  }
})
@Injectable()
export class AuthState {

  private static SALT_ROUNDS = 10;

  constructor(private dataService: DataService) { }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.isLoggedIn;
  }

  @Action(SetUserAction)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUserAction): void {
    ctx.patchState({ user: action.user });
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({ user: null, isLoggedIn: false});
  }

  @Action(GetUserAction)
  getUser(ctx: StateContext<AuthStateModel>, action: GetUserAction): void {
    this.dataService.getUser(action.id).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data) => {
        ctx.dispatch(new SetUserAction(data));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }

  @Action(LoginAction)
  loginUser(ctx: StateContext<AuthStateModel>, action: LoginAction): void {
    ctx.dispatch(new PendingStateTransitionAction());
    this.dataService.login(action.email).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data) => {
        bcrypt.compare(action.pwd, data.pwd).then((result) => {
          if (result) {
            ctx.setState({ isLoggedIn: true });
          } else {
            ctx.dispatch(new ErrorStateTransitionAction());
          }
        });
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }

  @Action(RegisterAction)
  registerAction(ctx: StateContext<AuthStateModel>, action: RegisterAction): void {
    const newUser = action.newUser;
    newUser.pwd = this.hashPassword(newUser.pwd);

    ctx.dispatch(new PendingStateTransitionAction());
    this.dataService.register(newUser).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data) => {
        ctx.dispatch(new SetUserAction(data));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }

  private hashPassword(pw: string): string {
    return bcrypt.hash(pw, AuthState.SALT_ROUNDS).then((hash) => {
      return hash;
    });
  }
}
