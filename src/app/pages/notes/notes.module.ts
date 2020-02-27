import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { AddNoteComponent } from './add-note/add-note.component';

const routes: Routes = [
  {path: '', component: NotesComponent},
  {path: ':id', component: NoteDetailsComponent},
  {path: 'add', component: AddNoteComponent}
];

@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent, AddNoteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class NotesModule { }
