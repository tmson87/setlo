import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

// import model
import { User } from '../models/user.model';

// import storage
import { UserStorage } from '../storages/user.storage';

/**
 * Service to control User authentication
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(private http: Http) {}

  /**
   * Log in
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<User>}
   *
   * @memberof UserService
   */
  public authenticate(email: string, password: string, storeSession: boolean): Observable<User> {
    UserStorage.clear();

    const msg = {
      'jsonrpc': '2.0',
      'method': 'auth',
      'params': { email: email, password: password },
      'id': 1};

    return this.http.post('/auth', JSON.stringify(msg))
      .map((response) => {
        const jsonBody = response.json();

        if (jsonBody) {
          const result = jsonBody.result;
          if (result) {
            const user = new User();

            user.id = result.id;
            user.email = result.email;
            user.firstName = result.firstName;
            user.lastName = result.lastName;
            user.token = result.token;

            // Store user information
            if (storeSession) {
              UserStorage.store(result);
            }

            return Observable.of(user);
          } else {
            const error = jsonBody.error;
            if (error) {
              if (error.message) {
                throw new Error(error.message);
              } else {
                throw new Error('Unknown error');
              }
            }
          }
        }
        throw new Error('Invalid JSON response');
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Log out
   *
   * @returns {Observable<boolean>}
   *
   * @memberof UserService
   */
  public signOut(): Observable<boolean> {
    UserStorage.clear();
    return Observable.of(true);
  }
}
