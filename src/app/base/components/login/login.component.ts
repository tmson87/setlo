import { UserMediator } from '../../mediators/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  /**
   * Authenticated user.
   * @type {boolean}
   */
  private user$: Observable<User>;

  /**
   * Error if authentication failed.
   * @type {boolean}
   */
  private error$: Observable<string>;

  /**
   * The authentication form.
   * @type {FormGroup}
   */
  public form: FormGroup;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  /**
   * Component loading.
   * @type {boolean}
   */
  private loading = true;

  /**
   * Component error.
   * @type {boolean}
   */
  private hasError = false;

  constructor(private formBuilder: FormBuilder, private mediator: UserMediator) {
    this.user$ = this.mediator.user$;
    this.error$ = this.mediator.error$;
  }

  ngOnInit() {

    // set formGroup
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // subscribe to success
    this.mediator.isAuthenticated$
      .takeWhile(() => this.alive)
      .filter(authenticated => authenticated)
      .subscribe(value => {
        this.loading = false;
      });

    // subscribe to error
    this.mediator.error$
      .takeWhile(() => this.alive)
      .filter(error => error !== undefined)
      .subscribe(value => {
        this.loading = false;
        this.hasError = true;
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

  submit() {
    // get email and password values
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;
    this.loading = true;
    this.hasError = false;
    this.mediator.authenticate(email, password);
  }
}
