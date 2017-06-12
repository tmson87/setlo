import { Component, OnInit } from '@angular/core';

// import mediators
import { UserMediator, RouterMediator } from '../../mediators/index';

// import rxjs
import { Observable } from 'rxjs/Observable';

// import models
import { User } from '../../models/user.model';

/**
 * Navigation bar component
 *
 * @export
 * @class NavComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  /**
   * Authenticated flag.
   * @type {boolean}
   */
  private isAuthenticated = false;

  /**
   * User role flag.
   * @type {boolean}
   */
  private canUseQuestionBank = false;

  /**
   * User role flag.
   * @type {boolean}
   */
  private canUseOnlineTest = false;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  /**
   * Creates an instance of NavComponent.
   * @param {UserMediator} userMediator
   * @param {RouterMediator} routerMediator
   *
   * @memberof NavComponent
   */
  constructor(private userMediator: UserMediator, private routerMediator: RouterMediator) {
  }

  /**
   * Init Component
   *
   * @memberof NavComponent
   */
  ngOnInit() {

    this.userMediator.isAuthenticated$
      .takeWhile(() => this.alive)
      .subscribe(value => {
        this.isAuthenticated = value;
      });
    this.userMediator.user$
      .takeWhile(() => this.alive)
      .subscribe(user => {
        // tslint:disable-next-line:no-bitwise
        this.canUseQuestionBank = (user !== undefined) && ((user.role & 0x0F) !== 0);
        // tslint:disable-next-line:no-bitwise
        this.canUseOnlineTest = (user !== undefined) && ((user.role & 0xF0) !== 0);
      });
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * @method ngOnDestroy
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Sign out
   *
   * @memberof NavComponent
   */
  public signOut() {
    this.userMediator.signOut();
  }

  /**
   * Navigate to path
   *
   * @param {string} path
   *
   * @memberof NavComponent
   */
  public navigate(path: string) {
    this.routerMediator.goto(path);
  }
}
