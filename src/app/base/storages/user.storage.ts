// import type function
import { type } from '../../shared/utils/index';

// import selectors
import { getAuthenticatedUser, isAuthenticated } from '../selectors/user.selector';

// import rxjs
import { Observable } from 'rxjs/Observable';

// import models
import { User } from '../models/user.model';

/**
 * Contain field name to store User info
 */
export const StorageField = {
  USER: type('User'),
  TOKEN: type('Token'),
  TOKEN_EXP: type('Exp'),
};

/**
 * Storage for User information
 *
 * @export
 * @class UserStorage
 */
export class UserStorage {

  /**
   * Clear storage
   *
   * @static
   *
   * @memberof UserStorage
   */
  public static clear() {
    Object.keys(StorageField).map((key) => { localStorage.removeItem(StorageField[key]) });
  }

  /**
   * Store user info
   *
   * @static
   * @param {any} user
   *
   * @memberof UserStorage
   */
  public static store(user) {
    localStorage.setItem(StorageField.USER, JSON.stringify({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }));
    localStorage.setItem(StorageField.TOKEN, user.token);
    localStorage.setItem(StorageField.TOKEN_EXP, user.exp);
  }

  /**
   * Check user is authenticated
   *
   * @static
   * @returns
   *
   * @memberof UserStorage
   */
  public static isAuthenticated() {
    if (localStorage.getItem(StorageField.TOKEN)) {
      const exp = localStorage.getItem(StorageField.TOKEN_EXP);
      if (exp) {
        const now = new Date();
        const expDateTime = new Date(exp);
        return now <= expDateTime;
      }
    }
    return false;
  }

  public static getAuthenticatedUser(): Observable<any> {
    const userDat = localStorage.getItem(StorageField.USER);
    if (null == userDat) {
      return Observable.throw(new Error('No user info'));
    }

    if (!this.isAuthenticated()) {
      return Observable.throw(new Error('Token is expired'));
    }

    const userInfo = JSON.parse(userDat);

    const user = new User;
    user.id = userInfo.id;
    user.email = userInfo.email;
    user.firstName = userInfo.firstName;
    user.lastName = userInfo.lastName;
    user.role = userInfo.role;
    user.token = localStorage.getItem(StorageField.TOKEN);
    user.exp = localStorage.getItem(StorageField.TOKEN_EXP);

    return Observable.of(user);
  }
}
