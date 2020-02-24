import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ImageCardRowComponent } from './components/image-card-row/image-card-row.component';

@NgModule({
  declarations: [
    ToggleButtonComponent,
    NavComponent,
    ImageCardComponent,
    ImageCardRowComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    ToggleButtonComponent,
    NavComponent,
    ImageCardComponent,
    ImageCardRowComponent
  ]
})
export class SharedModule {
}
