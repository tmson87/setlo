import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

// import rxjs
import { Observable } from 'rxjs/Observable';

// import @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// import storage
import { UserStorage } from '../storages/user.storage';
import { State } from '../reducers/user.reducer';

/**
 * Redirect to home if already logged in
 * @class LoginPageGuard
 */
@Injectable()
export class LoginPageGuard implements CanActivate {

  /**
   * @constructor
   */
  constructor(private store: Store<State>) {}

  /**
   * True when user is not authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const authenticated = UserStorage.isAuthenticated();

    if (authenticated) {
      this.store.dispatch(go('/home'));
    }

    return !authenticated;
  }
}
