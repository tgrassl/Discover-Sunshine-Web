import { GetNotesAction } from './../../shared/state/user/user.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Note } from 'src/app/shared/models/note.model';
import { UserState } from 'src/app/shared/state/user/user.state';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Select(UserState.notes) notes$: Observable<Note[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetNotesAction());
  }

  public identify(index, item) {
    return item.id;
  }
}
