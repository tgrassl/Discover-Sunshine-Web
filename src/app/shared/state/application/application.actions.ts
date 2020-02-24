const prefix = '[Application]';

export class ErrorStateTransitionAction {
  static readonly type = `${prefix} Transition to error state`;
}

export class PendingStateTransitionAction {
  static readonly type = `${prefix} Transition to pending state`;
}

export class InitialStateTransitionAction {
  static readonly type = `${prefix} Transition to initial state`;
}

export class SuccessStateTransitionAction {
  static readonly type = `${prefix} Transition to success state`;
}

export class NoResultsStateTransitionAction {
  static readonly type = `${prefix} Transition to no results state`;
}

