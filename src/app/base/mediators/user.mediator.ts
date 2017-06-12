import { Injectable } from '@angular/core';

// Observalble
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

// @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// actions
import { AuthenticateAction } from '../actions/index';
import { State } from '../../store/app.reducer';
import { SignOutAction, GetAuthenticatedAction } from '../actions/user.action';

// models
import { User } from './../models/user.model';

// selectors
import {
  getAuthenticatedUser,
  getAuthenticationError,
  isAuthenticated
} from '../selectors/user.selector';

/**
 * Mediator for controlling User data
 *
 * @export
 * @class UserMediator
 */
@Injectable()
export class UserMediator {
  /**
   * The error if authentication fails.
   * @type {Observable<string>}
   */
  public error$: Observable<string>;

  /**
   * The user if authentication success.
   * @type {Observable<User>}
   */
  public user$: Observable<User>;

  /**
   * Authenticated flag.
   * @type {Observable<string>}
   */
  public isAuthenticated$: Observable<boolean>;

/**
 * Creates an instance of UserMediator.
 * @param {Store<State>} store
 *
 * @memberof UserMediator
 */
  constructor(private store: Store<State>) {
    this.user$ = this.store.select(getAuthenticatedUser);
    this.error$ = this.store.select(getAuthenticationError);
    this.isAuthenticated$ = this.store.select(isAuthenticated);

    // subscribe to authenticated
    this.isAuthenticated$
      .distinctUntilChanged()
      .subscribe(authenticated => {
        if (authenticated) {
          this.store.dispatch(go('/home'));
        } else {
          this.store.dispatch(go('/login'));
        }
      });

    // Get authenticated user
    this.store.dispatch(new GetAuthenticatedAction(null));
  }

/**
 * Process Login
 *
 * @param {string} email
 * @param {string} password
 *
 * @memberof UserMediator
 */
  public authenticate(email: string, password: string, storeSession: boolean) {
    // trim values
    email.trim();
    password.trim();

    // set payload
    const payload = {
      email: email,
      password: password,
      storeSession: storeSession
    };

    // dispatch AuthenticationAction and pass in payload
    this.store.dispatch(new AuthenticateAction(payload));
  }

  /**
   * Sign out
   *
   * @memberof UserMediator
   */
  public signOut() {
    // dispatch SignOutAction
    this.store.dispatch(new SignOutAction());
  }
}
