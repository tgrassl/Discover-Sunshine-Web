import { LogoutAction } from './shared/state/auth/auth.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ofActionDispatched, Actions } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) { }

  public canShowNav() {
    return !(this.router.url.includes('login') || this.router.url.includes('register'));
  }
}
