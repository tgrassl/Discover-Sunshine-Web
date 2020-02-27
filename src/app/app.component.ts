import { LogoutAction } from './shared/state/auth/auth.actions';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ofActionDispatched, Actions, Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { ToggleMobileMapAction } from './shared/state/search/search.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private actions: Actions, private store: Store) { }

  public canShowNav() {
    return !(this.router.url.includes('login') || this.router.url.includes('register'));
  }

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(LogoutAction)).subscribe(() => {
      this.router.navigate(['/']);
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((nav: NavigationEnd) => {
      if (!nav.url.includes('map')) {
        this.store.dispatch(new ToggleMobileMapAction());
      }
    });
  }
}
