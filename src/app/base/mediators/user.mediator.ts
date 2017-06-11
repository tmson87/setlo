import { getAuthenticatedUser } from './../../store/app.reducer';
import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
// @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// actions
import { AuthenticateAction } from '../actions/index';

// reducers
import {
  getUserState,
  getAuthenticationError,
  isAuthenticated,
  isAuthenticationLoading,
  State
} from '../../store/index';

@Injectable()
export class UserMediator {
    users$ = getUserState;

    constructor(private store: Store<State>) {
    }

    public login(email: string, password: string) {
        // trim values
        email.trim();
        password.trim();

        // set payload
        const payload = {
        email: email,
        password: password
        };

        // dispatch AuthenticationAction and pass in payload
        this.store.dispatch(new AuthenticateAction(payload));
    }

    /**
     * Returns the authenticated user
     * @returns {User}
     */
    public authenticatedUser(): Observable<User> {
        // Normally you would do an HTTP request to determine if
        // the user has an existing auth session on the server
        // but, let's just return the mock user for this example.
        return this.users$;
    }
}
