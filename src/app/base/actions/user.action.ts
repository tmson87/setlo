// import @ngrx
import { Action } from '@ngrx/store';

// import type function
import { type } from '../../shared/utils/index';

// import models
import { User } from '../models/index';

export const ActionTypes = {
  AUTHENTICATE: type('[User] Authenticate'),
  AUTHENTICATE_ERROR: type('[User] Authentication error'),
  AUTHENTICATE_SUCCESS: type('[User] Authentication success'),
  AUTHENTICATED: type('[User] Authenticated'),
  AUTHENTICATED_ERROR: type('[User] Authenticated error'),
  AUTHENTICATED_SUCCESS: type('[User] Authenticated success'),
};

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action}
 */
export class AuthenticateAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE;

  constructor(public payload: {email: string, password: string}) {}
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action}
 */
export class AuthenticatedAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED;

  constructor(public payload?: {token?: string}) {}
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action}
 */
export class AuthenticatedSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  constructor(public payload: {authenticated: boolean, user: User}) {}
}

/**
 * Authenticated check error.
 * @class AuthenticatedErrorAction
 * @implements {Action}
 */
export class AuthenticatedErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action}
 */
export class AuthenticationErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action}
 */
export class AuthenticationSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
 * Actions type.
 * @type {Actions}
 */
export type Actions =
  AuthenticateAction
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction;
