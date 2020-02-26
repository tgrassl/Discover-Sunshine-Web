import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FooterComponent } from './components/footer/footer.component';
import { ImageCardRowComponent } from './components/image-card-row/image-card-row.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { LitepickerComponent } from './components/litepicker/litepicker.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';

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
    GooglePlaceModule,
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
