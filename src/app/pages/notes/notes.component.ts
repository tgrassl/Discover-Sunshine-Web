import { User } from './../../shared/models/user.model';
import { AuthState } from './../../shared/state/auth/auth.state';
import { GetNotesAction } from './../../shared/state/user/user.actions';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Note } from 'src/app/shared/models/note.model';
import { UserState } from 'src/app/shared/state/user/user.state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  @Select(UserState.notes) notes$: Observable<Note[]>;
  @Select(AuthState.user) user$: Observable<User>;

  private sub: Subscription;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.sub = this.user$.pipe(take(2)).subscribe(user => {
      if (user) {
        this.store.dispatch(new GetNotesAction());
      }
    });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public identify(index, item): any {
    return index;
  }

  public canShowNoNotesWarning(): boolean {
    return this.store.selectSnapshot(UserState.notes).length < 1;
  }
}
