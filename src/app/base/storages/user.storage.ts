// import type function
import { type } from '../../shared/utils/index';

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
    Object.keys(StorageField).map((key) => { localStorage.removeItem(key) });
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
      lastName: user.lastName
    }));
    localStorage.setItem(StorageField.TOKEN, user.token);
    localStorage.setItem(StorageField.TOKEN_EXP, user.exp);
  }

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
}
