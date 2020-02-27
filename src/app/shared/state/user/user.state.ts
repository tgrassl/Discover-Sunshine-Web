import { Note } from './../../models/note.model';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { ErrorStateTransitionAction, PendingStateTransitionAction, SuccessStateTransitionAction } from '../application/application.actions';
import { AuthState } from './../auth/auth.state';
import { GetNotesAction, SetNotesAction, AddNoteAction, DeleteNoteAction, UpdateNoteAction, SetSelectedNoteAction } from './user.actions';

export interface UserStateModel {
  notes: Note[];
  selectedNote?: Note;
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

  @Selector()
  static selectedNote(state: UserStateModel): Note {
    return state.selectedNote;
  }

  @Action(SetNotesAction)
  setNotes(ctx: StateContext<UserStateModel>, action: SetNotesAction): void {
    const notes = action.notes;
    const sortedNotes = notes.slice().sort((a, b) => {
      const c = new Date(a.created);
      const d = new Date(b.created);
      return +d - +c;
    });
    ctx.patchState({ notes: sortedNotes });
  }

  @Action(AddNoteAction)
  addNote(ctx: StateContext<UserStateModel>, action: AddNoteAction): void {
    ctx.dispatch(new PendingStateTransitionAction());

    this.dataService.addNote(action.newNote).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data: Note) => {
        const notes = ctx.getState().notes;
        const newNotes = [...notes, data];
        ctx.dispatch(new SetNotesAction(newNotes));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }

  @Action(DeleteNoteAction)
  deleteNote(ctx: StateContext<UserStateModel>, action: DeleteNoteAction): void {
    ctx.dispatch(new PendingStateTransitionAction());
    const notes = ctx.getState().notes;
    const newNotes = notes.filter(note => note.id !== action.noteId);

    this.dataService.deleteNote(action.noteId).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data: Note[]) => {
        ctx.dispatch(new SetNotesAction(newNotes));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }

  @Action(UpdateNoteAction)
  updateNote(ctx: StateContext<UserStateModel>, action: UpdateNoteAction): void {
    ctx.dispatch(new PendingStateTransitionAction());
    const notes = ctx.getState().notes;
    const noteToUpdateIndex = notes.findIndex(note => note.id === action.updatedNote.id);
    const newNotes = [...notes];
    newNotes[noteToUpdateIndex] = action.updatedNote;

    this.dataService.updateNote(action.updatedNote).pipe(
      catchError(err => {
        ctx.dispatch(new ErrorStateTransitionAction());
        return throwError(err);
      }))
      .subscribe((data) => {
        ctx.dispatch(new SetNotesAction(newNotes));
        ctx.dispatch(new SuccessStateTransitionAction());
      });
  }

  @Action(SetSelectedNoteAction)
  setSelectedNote(ctx: StateContext<UserStateModel>, action: SetSelectedNoteAction): void {
    ctx.patchState({ selectedNote: action.selectedNote });
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
