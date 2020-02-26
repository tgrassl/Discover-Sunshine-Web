import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../shared/state/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store) { }

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isLoggedIn);
    return isAuthenticated;
  }
}
