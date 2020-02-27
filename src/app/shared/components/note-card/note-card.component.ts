import { Note } from './../../models/note.model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  public static MAX_PREVIEW_LENGTH = 200;

  @Input() note: Note;

  constructor() { }

  ngOnInit(): void {
  }

  public getTimeFormat(): string {
    return moment(this.note.created).format('DD.MM.YYYY');
  }
  
  public getPreviewText() {
    if (this.note.content.length > NoteCardComponent.MAX_PREVIEW_LENGTH) {
      return this.note.content.substr(0, NoteCardComponent.MAX_PREVIEW_LENGTH);
    } else {
      return this.note.content;
    }
  }
}
