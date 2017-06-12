import { Injectable } from '@angular/core';

// @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// actions
import { State } from '../../store/app.reducer';

/**
 * Mediator for controlling router
 *
 * @export
 * @class RouterMediator
 */
@Injectable()
export class RouterMediator {

  constructor(private store: Store<State>) {
  }

  /**
   * Navigate by path
   *
   * @param {string} path
   *
   * @memberof RouterMediator
   */
  public goto(path: string) {
    this.store.dispatch(go(path));
  }
}
