import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteDetailsComponent } from './note-details/note-details.component';

const routes: Routes = [
  {path: '', component: NotesComponent},
  {path: ':id', component: NoteDetailsComponent},
  {path: 'add', component: NoteDetailsComponent}
];

@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class NotesModule { }
