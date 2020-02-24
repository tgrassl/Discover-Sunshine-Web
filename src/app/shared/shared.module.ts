import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ApplicationState } from './state/application/application.state';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    ToggleButtonComponent,
    NavComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    ToggleButtonComponent,
  ]
})
export class SharedModule {
}
