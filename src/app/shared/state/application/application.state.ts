import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import {
  ErrorStateTransitionAction,
  InitialStateTransitionAction,
  PendingStateTransitionAction,
  SuccessStateTransitionAction,
  NoResultsStateTransitionAction,
} from './application.actions';

export enum APPLICATION_STATE {
  INITIAL = '[APPLICATION_STATE] Initial',
  PENDING = '[APPLICATION_STATE] Pending',
  SUCCESS = '[APPLICATION_STATE] Success',
  NO_RESULTS = '[APPLICATION_STATE] No Results',
  ERROR = '[APPLICATION_STATE] Error',
}

export interface ApplicationStateModel {
  applicationState: APPLICATION_STATE;
}

@State<ApplicationStateModel>({
  name: 'application',
  defaults: {
    applicationState: APPLICATION_STATE.INITIAL,
  }
})
export class ApplicationState {

  constructor() { }

  @Selector()
  static applicationState(state: ApplicationStateModel): APPLICATION_STATE {
    return state.applicationState;
  }

  @Action(ErrorStateTransitionAction)
  errorStateTransition(ctx: StateContext<ApplicationStateModel>) {
    ctx.patchState({ applicationState: APPLICATION_STATE.ERROR });
  }

  @Action(InitialStateTransitionAction)
  initialStateTransition(ctx: StateContext<ApplicationStateModel>) {
    ctx.patchState({ applicationState: APPLICATION_STATE.INITIAL });
  }

  @Action(PendingStateTransitionAction)
  pendingStateTransition(ctx: StateContext<ApplicationStateModel>) {
    ctx.patchState({ applicationState: APPLICATION_STATE.PENDING });
  }

  @Action(SuccessStateTransitionAction)
  successStateTransition(ctx: StateContext<ApplicationStateModel>) {
    ctx.patchState({ applicationState: APPLICATION_STATE.SUCCESS });
  }

  @Action(NoResultsStateTransitionAction)
  noResultsStateTransition(ctx: StateContext<ApplicationStateModel>) {
    ctx.patchState({ applicationState: APPLICATION_STATE.NO_RESULTS });
  }
}
