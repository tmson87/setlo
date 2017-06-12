import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

// import rxjs
import { Observable } from 'rxjs/Observable';

// import store
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { State } from '../../store/app.reducer';
import { isAuthenticated, isAuthLoaded } from '../selectors/user.selector';
import 'rxjs/add/operator/mergeMap';

/**
 * Redirect to home if already logged in
 * @class LoginPageGuard
 */
@Injectable()
export class LoginPageGuard implements CanActivate {

  /**
   * Creates an instance of LoginPageGuard.
   * @param {Store<State>} store
   *
   * @memberof LoginPageGuard
   */
  constructor(private store: Store<State>) {}

  /**
   * True when user is not authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // get observable
    const observable$ = this.store.
    select(isAuthLoaded).filter(loaded => loaded)
    .flatMap(loaded => {
      return this.store.select(isAuthenticated).map(authenticated => {
        return !authenticated;
      });
    });

    // redirect to sign in page if user is not authenticated
    observable$.subscribe(canActive => {
      if (!canActive) {
        this.store.dispatch(go('/home'));
      }
    });

    return observable$;
  }
}
