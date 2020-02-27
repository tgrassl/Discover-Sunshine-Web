import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Note } from '../../models/note.model';
import { DataService } from '../../services/data.service';
import { ErrorStateTransitionAction, PendingStateTransitionAction, SuccessStateTransitionAction } from '../application/application.actions';
import { AuthState } from './../auth/auth.state';
import { GetNotesAction, SetNotesAction, AddNoteAction, DeleteNoteAction } from './user.actions';

export interface UserStateModel {
  notes: Note[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    notes: null
  }
})
@Injectable()
export class UserState {

  constructor(private dataService: DataService, private store: Store) { }

  @Selector()
  static notes(state: UserStateModel): Note[] {
    return state.notes;
  }

  @Action(SetNotesAction)
  setNotes(ctx: StateContext<UserStateModel>, action: SetNotesAction): void {
    ctx.patchState({ notes: action.notes });
  }

  @Action(AddNoteAction)
  addNote(ctx: StateContext<UserStateModel>, action: AddNoteAction): void {
    // ctx.patchState({ notes: action.newNote });
  }

  @Action(DeleteNoteAction)
  deleteNote(ctx: StateContext<UserStateModel>, action: DeleteNoteAction): void {
    // ctx.patchState({ notes: action.newNote });
  }

  @Action(GetNotesAction)
  getNotes(ctx: StateContext<UserStateModel>, action: GetNotesAction): void {
    ctx.dispatch(new PendingStateTransitionAction());
    let uid = null;
    if (action.uid) {
      uid = action.uid;
    } else {
      uid = this.store.selectSnapshot(AuthState.user).id;
    }

    if (uid) {
      this.dataService.getNotes(uid).pipe(
        catchError(err => {
          ctx.dispatch(new ErrorStateTransitionAction());
          return throwError(err);
        }))
        .subscribe((data: Note[]) => {
          ctx.dispatch(new SetNotesAction(data));
          ctx.dispatch(new SuccessStateTransitionAction());
        });
    }
  }
}
