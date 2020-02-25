import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ImageCardRowComponent } from './components/image-card-row/image-card-row.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LitepickerComponent } from './components/litepicker/litepicker.component';

@NgModule({
  declarations: [
    ToggleButtonComponent,
    NavComponent,
    ImageCardComponent,
    ImageCardRowComponent,
    FooterComponent,
    SearchBarComponent,
    LitepickerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToggleButtonComponent,
    NavComponent,
    ImageCardComponent,
    ImageCardRowComponent,
    FooterComponent,
    SearchBarComponent,
  ]
})
export class SharedModule {
}
