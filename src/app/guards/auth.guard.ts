import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../shared/state/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isLoggedIn);

    const currPath = route.routeConfig.path;
    if (currPath.includes('login') || currPath.includes('register')) {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
    } else {
      return isAuthenticated;
    }
  }
}
