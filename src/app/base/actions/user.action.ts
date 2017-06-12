// import @ngrx
import { Action } from '@ngrx/store';

// import type function
import { type } from '../../shared/utils/index';

// import models
import { User } from '../models/index';

/**
 * User action types
 */
export const ActionTypes = {
  AUTHENTICATE: type('[User] Authenticate'),
  AUTHENTICATE_ERROR: type('[User] Authentication error'),
  AUTHENTICATE_SUCCESS: type('[User] Authentication success'),
  GET_AUTHENTICATED: type('[User] Get Authenticated'),
  GET_AUTHENTICATED_ERROR: type('[User] Get Authenticated error'),
  GET_AUTHENTICATED_SUCCESS: type('[User] Get Authenticated success'),
  SIGN_OUT: type('[User] Sign out'),
  SIGN_OUT_ERROR: type('[User] Sign out error'),
  SIGN_OUT_SUCCESS: type('[User] Sign out success'),
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
 * Get authenticated user from storage
 * @class GetAuthenticatedAction
 * @implements {Action}
 */
export class GetAuthenticatedAction implements Action {
  public type: string = ActionTypes.GET_AUTHENTICATED;

  constructor(public payload?: any) {}
}

/**
 * Get authenticated user from storage successfully
 * @class GetAuthenticatedSuccessAction
 * @implements {Action}
 */
export class GetAuthenticatedSuccessAction implements Action {
  public type: string = ActionTypes.GET_AUTHENTICATED_SUCCESS;

  constructor(public payload: {user: User}) {}
}

/**
 * Get authenticated user from storage failed
 * @class GetAuthenticatedErrorAction
 * @implements {Action}
 */
export class GetAuthenticatedErrorAction implements Action {
  public type: string = ActionTypes.GET_AUTHENTICATED_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Sign out.
 * @class SignOutAction
 * @implements {Action}
 */
export class SignOutAction implements Action {
  public type: string = ActionTypes.SIGN_OUT;
  constructor(public payload?: any) {}
}

/**
 * Sign out error.
 * @class SignOutErrorAction
 * @implements {Action}
 */
export class SignOutErrorAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action}
 */
export class SignOutSuccessAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

/**
 * Actions type.
 * @type {Actions}
 */
export type Actions =
  AuthenticateAction
  | GetAuthenticatedAction
  | GetAuthenticatedErrorAction
  | GetAuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction
  | SignOutAction
  | SignOutSuccessAction
  | SignOutErrorAction
  ;
