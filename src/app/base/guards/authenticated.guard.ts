import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

// import store
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { State, getUsersState } from '../../store/app.reducer';
import { isAuthenticated, isAuthLoaded } from '../selectors/user.selector';

// import mediators
import { RouterMediator } from '../mediators/index';

/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {

  /**
   * Creates an instance of AuthenticatedGuard.
   * @param {Store<State>} store
   * @param {RouterMediator} routerMediator
   *
   * @memberof AuthenticatedGuard
   */
  constructor(private store: Store<State>, private routerMediator: RouterMediator) {}

  /**
   * True when user is authenticated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {(Observable<boolean> | boolean)}
   *
   * @memberof AuthenticatedGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // get observable
    const observable$ = this.store
      .select(isAuthLoaded).filter(loaded => loaded)
      .flatMap(loaded => {
        return this.store.select(isAuthenticated);
      });

    // redirect to log in page if user is not authenticated
    observable$.subscribe(authenticated => {
      if (!authenticated) {
        this.routerMediator.goto('/login');
      }
    });

    return observable$;
  }
}
