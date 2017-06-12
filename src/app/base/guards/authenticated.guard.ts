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
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {

  /**
   * @constructor
   */
  constructor(private store: Store<State>) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const authenticated = UserStorage.isAuthenticated();

    if (!authenticated) {
      this.store.dispatch(go('/login'));
    }

    return authenticated;
  }
}
