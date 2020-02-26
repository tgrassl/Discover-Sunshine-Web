import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';

const routes: Routes = [
  {path: '', component: MapComponent}
];

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MapModule { }
