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
import { NumberSelectComponent } from './components/number-select/number-select.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { InteractiveGoogleMapComponent } from './components/interactive-google-map/interactive-google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    ToggleButtonComponent,
    NavComponent,
    ImageCardComponent,
    ImageCardRowComponent,
    FooterComponent,
    SearchBarComponent,
    LitepickerComponent,
    NumberSelectComponent,
    InteractiveGoogleMapComponent,
    ResultCardComponent,
    AuthFormComponent,
    LoadingSpinnerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    SatPopoverModule,
    GoogleMapsModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    ToggleButtonComponent,
    NavComponent,
    ImageCardComponent,
    ImageCardRowComponent,
    FooterComponent,
    SearchBarComponent,
    NumberSelectComponent,
    InteractiveGoogleMapComponent,
    ResultCardComponent,
    AuthFormComponent,
  ]
})
export class SharedModule {
}
