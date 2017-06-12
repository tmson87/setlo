import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

// import store
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { State } from '../../store/app.reducer';
import { isAuthenticated, isAuthLoaded } from '../selectors/user.selector';

// import mediators
import { RouterMediator } from '../mediators/index';

/**
 * Redirect to home if already logged in
 * @class LoginPageGuard
 */
@Injectable()
export class LoginPageGuard implements CanActivate {

  /**
   * Creates an instance of AuthenticatedGuard.
   * @param {Store<State>} store
   * @param {RouterMediator} routerMediator
   *
   * @memberof LoginPageGuard
   */
  constructor(private store: Store<State>, private routerMediator: RouterMediator) {}

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
        this.routerMediator.goto('/home');
      }
    });

    return observable$;
  }
}
