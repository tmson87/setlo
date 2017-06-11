import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

    /**
     * True if authenticated
     * @type
     */
    private _authenticated = false;

    constructor(private http: Http) { }
    public authenticate(email: string, password: string): Observable<User> {
        return this.http.post('/auth', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                // if (token) {
                //     // set token property
                //     this.token = token;

                //     // store username and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

                //     // return true to indicate successful login
                //     return true;
                // } else {
                //     // return false to indicate failed login
                //     return false;
                // }
            });

        return Observable.throw(new Error('Invalid email or password'));
    }

    /**
       * Determines if the user is authenticated
       * @returns {Observable<boolean>}
       */
    public authenticated(): Observable<boolean> {
        return Observable.of(this._authenticated);
    }
}
