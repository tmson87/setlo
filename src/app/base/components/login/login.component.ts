import { UserMediator } from '../../mediators/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserMediator]
})
export class LoginComponent implements OnInit {

  /**
   * The authentication form.
   * @type {FormGroup}
   */
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private mediator: UserMediator) { }

  ngOnInit() {
    // set formGroup
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    // get email and password values
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;
    this.mediator.login(email, password);
  }

}
