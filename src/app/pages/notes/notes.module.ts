import { NoteGuard } from './../../guards/note.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/plugins/lists.min.js';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: ':id', component: NoteDetailsComponent },
  { path: 'add', component: NoteDetailsComponent }
];

@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ]
})
export class NotesModule { }
