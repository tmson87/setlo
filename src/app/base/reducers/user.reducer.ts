// import actions
import { Actions, ActionTypes } from '../actions/user.action';

// import models
import { User } from '../models/user.model';

/**
 * The state.
 * @interface State
 */
export interface State {

  // boolean if user is authenticated
  authenticated: boolean;

  // error message
  error?: string;

  // the authenticated user
  user?: User;
}

/**
 * The initial state.
 */
const initialState: State = {
  authenticated: false
};

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function reducer(state: any = initialState, action: Actions): State {

  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
    case ActionTypes.SIGN_OUT:
      return Object.assign({}, state, {
      });

    case ActionTypes.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message
      });

    case ActionTypes.AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        user: action.payload.user
      });

    case ActionTypes.SIGN_OUT_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
        error: undefined,
        user: undefined
      });

    default:
      return state;
  }
}

/**
 * Returns true if the user is authenticated.
 * @function isAuthenticated
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticated = (state: State) => state.authenticated;

/**
 * Return the users state
 * @function getAuthenticatedUser
 * @param {State} state
 * @returns {User}
 */
export const getAuthenticatedUser = (state: State) => state.user;

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @returns {Error}
 */
export const getAuthenticationError = (state: State) => state.error;
