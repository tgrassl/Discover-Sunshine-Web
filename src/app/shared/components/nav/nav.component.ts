import { SetRedirectAction } from './../../state/auth/auth.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../state/auth/auth.state';
import { Router } from '@angular/router';
import { LogoutAction } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  public isMenuOpen = false;

  constructor(private store: Store, private router: Router) { }

  public handleAuthButtonClick() {
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);
    const currPath = this.router.routerState.snapshot.url;

    if (isLoggedIn) {
      this.store.dispatch(new LogoutAction())
    } else {
      this.store.dispatch(new SetRedirectAction(currPath));
      this.router.navigateByUrl('login');
    }
  }

  public toggleMobileNav(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
