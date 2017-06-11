import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

// import rxjs
import { Observable } from 'rxjs/Observable';

// import @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// reducers
import {
  isAuthenticated,
  State
} from '../reducers/index';

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
    // get observable
    const observable = this.store.select(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.store.dispatch(go('/login'));
      }
    });

    return observable;
  }
}