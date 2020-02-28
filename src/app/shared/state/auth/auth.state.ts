import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext, NgxsOnInit, Actions, ofActionCompleted } from '@ngxs/store';
import * as bcrypt from 'bcryptjs';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { PendingStateTransitionAction } from '../application/application.actions';
import { ErrorStateTransitionAction, SuccessStateTransitionAction } from './../application/application.actions';
import { GetUserAction, LoginAction, RegisterAction, SetUserAction, LogoutAction, SetRedirectAction } from './auth.actions';
import * as moment from 'moment';
import { Router } from '@angular/router';

export interface AuthStateModel {
  user?: User;
  isLoggedIn: boolean;
  redirectUrl?: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    isLoggedIn: false,
  }
})
@Injectable()
export class AuthState implements NgxsOnInit {

  private static MAX_ROUNDS = 10;
  private static MIN_ROUNDS = 5;
  private static STORAGE_KEY_TIME = 'lastLogin';
  private static STORAGE_KEY_USER = 'userID';

  constructor(
    private dataService: DataService,
    private actions: Actions,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector()
  static redirectUrl(state: AuthStateModel): string {
    return state.redirectUrl;
  }

  public ngxsOnInit(ctx?: StateContext<any>): void {
    this.retrieveSessionFromLocalStorage(ctx);
  }

  @Action(SetUserAction)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUserAction): void {
    ctx.patchState({ user: action.user });
  }

  @Action(SetRedirectAction)
  setRedirectUrl(ctx: StateContext<AuthStateModel>, action: SetRedirectAction): void {
    ctx.patchState({ redirectUrl: action.redirect });
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({ user: null, isLoggedIn: false });
    this.removeSessionFromLocalStorage();
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
      .subscribe(async (data) => {
        data = JSON.parse(data);
        const result = await bcrypt.compare(action.pwd, data.pwd);
        if (result) {
          await ctx.dispatch(new GetUserAction(data.id));
          await this.actions.pipe(ofActionCompleted(SetUserAction), take(1)).toPromise();
          const user = ctx.getState().user;
          ctx.patchState({ isLoggedIn: true });
          this.saveSessionToLocalStorage(user);
          ctx.dispatch(new SuccessStateTransitionAction());
          this.redirectUser(ctx);
        } else {
          ctx.dispatch(new ErrorStateTransitionAction());
        }
      });
  }

  @Action(RegisterAction)
  async registerAction(ctx: StateContext<AuthStateModel>, action: RegisterAction) {
    ctx.dispatch(new PendingStateTransitionAction());
    const newUser = action.newUser;
    newUser.pwd = await this.hashPassword(newUser.pwd);

    this.dataService.register(newUser).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe(async (data: any) => {
        const userResponse: User = JSON.parse(data);
        await ctx.dispatch(new SetUserAction(userResponse));
        const user = ctx.getState().user;
        if (user) {
          ctx.patchState({ isLoggedIn: true });
          this.saveSessionToLocalStorage(user);
          ctx.dispatch(new SuccessStateTransitionAction());
          this.redirectUser(ctx);
        } else {
          ctx.dispatch(new ErrorStateTransitionAction());
        }
      });
  }

  private redirectUser(ctx: StateContext<AuthStateModel>): void {
    const redirect = ctx.getState().redirectUrl;
    this.ngZone.run(() => {
      this.router.navigateByUrl(redirect);
    });
  }

  private saveSessionToLocalStorage(user: User): void {
    localStorage.setItem(AuthState.STORAGE_KEY_TIME, moment().toISOString());
    localStorage.setItem(AuthState.STORAGE_KEY_USER, user.id.toString());
  }

  private removeSessionFromLocalStorage(): void {
    localStorage.removeItem(AuthState.STORAGE_KEY_TIME);
    localStorage.removeItem(AuthState.STORAGE_KEY_USER);
  }


  private retrieveSessionFromLocalStorage(ctx: StateContext<AuthStateModel>) {
    const lastLogin = localStorage.getItem(AuthState.STORAGE_KEY_TIME);

    if (lastLogin) {
      const lastLoginDate = moment(lastLogin);
      const expirationDate = lastLoginDate.add(30, 'day');
      const isExpired = moment().isSameOrAfter(expirationDate);

      if (isExpired) {
        this.removeSessionFromLocalStorage();
      } else {
        const userID = Number(localStorage.getItem(AuthState.STORAGE_KEY_USER));
        ctx.dispatch(new GetUserAction(userID));
        ctx.patchState({ isLoggedIn: true });
      }
    }
  }

  private async hashPassword(pw: string): Promise<string> {
    return await bcrypt.hash(pw, this.getRandomSaltRounds());
  }

  private getRandomSaltRounds(): number {
    return Math.floor(Math.random() * (AuthState.MAX_ROUNDS - AuthState.MIN_ROUNDS + 1) + AuthState.MIN_ROUNDS);
  }
}
