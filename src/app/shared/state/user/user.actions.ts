import { Note } from '../../models/note.model';

const prefix = '[User]';

export class GetNotesAction {
  static readonly type = `${prefix} Get Notes`;
  constructor(public uid?: number) { }
}

export class DeleteNoteAction {
  static readonly type = `${prefix} Delete Note`;
  constructor(public noteId?: number) { }
}

export class SetNotesAction {
  static readonly type = `${prefix} Set Notes`;
  constructor(public notes: Note[]) { }
}

export class AddNoteAction {
  static readonly type = `${prefix} Add Note`;
  constructor(public newNote: Note) { }
}
