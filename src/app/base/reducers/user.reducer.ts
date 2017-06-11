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

  // true if we have attempted existing auth session
  loaded: boolean;

  // true when loading
  loading: boolean;

  // the authenticated user
  user?: User;
}

/**
 * The initial state.
 */
const initialState: State = {
  authenticated: false,
  loaded: false,
  loading: false
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
      return Object.assign({}, state, {
        loading: true
      });

    case ActionTypes.AUTHENTICATED_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message,
        loaded: true
      });

    case ActionTypes.AUTHENTICATED_SUCCESS:
      return Object.assign({}, state, {
        authenticated: action.payload.authenticated,
        loaded: true,
        user: action.payload.user
      });

    case ActionTypes.AUTHENTICATED_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message,
        loading: false
      });

    case ActionTypes.AUTHENTICATED_SUCCESS:
      const user: User = action.payload.user;

      // verify user is not null
      if (user === null) {
        return state;
      }

      return Object.assign({}, state, {
        authenticated: true,
        error: undefined,
        loading: false,
        user: user
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
 * Returns true if the authenticated has loaded.
 * @function isAuthenticatedLoaded
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticatedLoaded = (state: State) => state.loaded;

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

/**
 * Returns true if request is in progress.
 * @function isLoading
 * @param {State} state
 * @returns {boolean}
 */
export const isLoading = (state: State) => state.loading;
