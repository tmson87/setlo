// reselect
import { createSelector } from 'reselect';

// @ngrx
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

// environment
import { environment } from '../../environments/environment';

/**
 * Every reducer module"s default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as user from '../base/reducers/index';

/**
 * We treat each reducer like a table in a database.
 * This means our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: RouterState;
  user: user.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  router: routerReducer,
  users: user.reducer
};

// development reducer includes storeFreeze to prevent state from being mutated
const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

// production reducer
const productionReducer: ActionReducer<State> = combineReducers(reducers);

/**
 * The single reducer function.
 * @function reducer
 * @param {any} state
 * @param {any} action
 */
export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/**********************************************************
 * Users Reducers
 *********************************************************/

/**
 * Returns the user state.
 * @function getUserState
 * @param {State} state Top level state.
 * @return {State}
 */
export const getUserState = (state: State) => state.user;

/**
 * Returns the authenticated user
 * @function getAuthenticatedUser
 * @param {State} state
 * @param {any} props
 * @return {User}
 */
export const getAuthenticatedUser = createSelector(getUserState, user.getAuthenticatedUser);

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getAuthenticationError = createSelector(getUserState, user.getAuthenticationError);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticated = createSelector(getUserState, user.isAuthenticated);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticatedLoaded = createSelector(getUserState, user.isAuthenticatedLoaded);

/**
 * Returns true if the authentication request is loading.
 * @function isAuthenticationLoading
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticationLoading = createSelector(getUserState, user.isLoading);
