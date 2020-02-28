import { environment } from 'src/environments/environment';
import { ApplicationState, APPLICATION_STATE } from './../../../shared/state/application/application.state';
import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Note } from 'src/app/shared/models/note.model';
import { UserState } from 'src/app/shared/state/user/user.state';
import { AddNoteAction, DeleteNoteAction, UpdateNoteAction } from './../../../shared/state/user/user.actions';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoteDetailsComponent implements OnInit {

  public noteForm: FormGroup;
  public detailView = false;
  public currentNote: Note;
  public editorOptions: any = {
    toolbar: 'bold italic underline code undo redo',
    plugins: 'lists',
    width: '100%',
    body_class: 'note-editor',
    branding: false,
    menubar: false,
    block_formats: null,
    contextmenu: null,
    resize: false
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private store: Store) { }

  public ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });

    this.prefillForm();
  }

  private prefillForm(): void {
    this.currentNote = this.store.selectSnapshot(UserState.selectedNote);

    if (this.route.snapshot.url[0].path !== 'add') {
      this.detailView = true;
      if (this.currentNote) {
        this.noteForm.patchValue(this.currentNote);
      } else {
        this.router.navigateByUrl('/notes');
      }
    }
  }


  public getHeaderText(): string {
    return this.detailView ? 'bearbeiten' : 'hinzufügen';
  }

  public navigateBack(): void {
    this.location.back();
  }

  public saveNote(): void {
    if (this.noteForm.valid) {
      const formValues = this.noteForm.value;
      const newNote: Note = {
        created: new Date(),
        content: formValues.content,
        title: formValues.title,
      };

      if (this.detailView) {
        newNote.id = this.currentNote.id;
        this.store.dispatch(new UpdateNoteAction(newNote));
      } else {
        this.store.dispatch(new AddNoteAction(newNote));
      }

      this.navigateBack();
    }
  }

  public deleteNote(): void {
    this.store.dispatch(new DeleteNoteAction(this.currentNote.id));
    this.navigateBack();
  }

  public isDisabled(): boolean {
    return this.noteForm.invalid;
  }

  public isLoading(): boolean {
    return this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.PENDING;
  }

  public isError(): boolean {
    return this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.ERROR;
  }

  public getTinyApiKey() {
    return environment.tinyApiKey;
  }
}
