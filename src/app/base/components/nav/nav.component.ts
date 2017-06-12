import { Component, OnInit } from '@angular/core';
import { UserMediator } from '../../mediators/user.mediator';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  /**
   * Component error.
   * @type {boolean}
   */
  private isAuthenticated = false;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  constructor(private mediator: UserMediator) { }

  /**
   * Init Component
   *
   * @memberof NavComponent
   */
  ngOnInit() {
    this.mediator.isAuthenticated$
      .takeWhile(() => this.alive)
      .subscribe(value => {
        this.isAuthenticated = value;
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

  signOut() {
    this.mediator.signOut();
  }

}
