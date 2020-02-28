import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesComponent } from './notes.component';
import { EditorModule } from '@tinymce/tinymce-angular';

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
    EditorModule,
  ]
})
export class NotesModule { }
