import { SetSelectedNoteAction } from './../../state/user/user.actions';
import { Store } from '@ngxs/store';
import { Note } from './../../models/note.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoteCardComponent {

  public static MAX_PREVIEW_LENGTH = 200;

  @Input() note: Note;

  constructor(private store: Store) { }

  public getTimeFormat(): string {
    return moment(this.note.created).format('DD.MM.YYYY');
  }
  
  public getPreviewText(): string {
    if (this.note.content.length > NoteCardComponent.MAX_PREVIEW_LENGTH) {
      return this.note.content.substr(0, NoteCardComponent.MAX_PREVIEW_LENGTH) + '...';
    } else {
      return this.note.content;
    }
  }

  public selectNote(): void {
    this.store.dispatch(new SetSelectedNoteAction(this.note));
  }
}
