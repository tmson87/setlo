import { Injectable } from '@angular/core';

// import @ngrx
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

// import services
import { UserService } from '../services/index';

// import storage
import { UserStorage } from '../storages/index';

// import models
import { User } from '../models/index';

// import actions
import {
  ActionTypes,
  GetAuthenticatedErrorAction,
  GetAuthenticatedSuccessAction,
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  SignOutSuccessAction,
  SignOutErrorAction
} from '../actions/index';

/**
 * Effects for User reducers
 *
 * @export
 * @class UserEffects
 */
@Injectable()
export class UserEffects {

  /**
   * Authenticate user.
   */
  @Effect()
  public authenticate: Observable<Action> = this.actions
    .ofType(ActionTypes.AUTHENTICATE)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.authenticate(payload.email, payload.password, payload.storeSession)
        .map(user => new AuthenticationSuccessAction({ user: user }))
        .catch(error => Observable.of(new AuthenticationErrorAction({ error: error })));
    });

  /**
   * Get authenticated user from storage.
   */
  @Effect()
  public getAuthenticated: Observable<Action> = this.actions
    .ofType(ActionTypes.GET_AUTHENTICATED)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return UserStorage.getAuthenticatedUser()
        .map(user => new GetAuthenticatedSuccessAction({ user: user }))
        .catch(error => Observable.of(new GetAuthenticatedErrorAction({})));
    });

  /**
   * Terminate user session.
   */
  @Effect()
  public signOut: Observable<Action> = this.actions
    .ofType(ActionTypes.SIGN_OUT)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.signOut()
        .map(value => new SignOutSuccessAction())
        .catch(error => Observable.of(new SignOutErrorAction({ error: error })));
    });

  /**
   * @constructor
   * @param {Actions }actions
   * @param {UserService} userService
   */
  constructor(
    private actions: Actions,
    private userService: UserService
  ) { }
}
