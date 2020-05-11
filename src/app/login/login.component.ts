import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../common/service/authentication_service/authentication.service';
import { LoginModel } from '../common/model/loginModel';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { LoginStateModel } from '../common/model/loginStateModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userType: string;
  loginForm: FormGroup;
  hide = true;
  image = 'assets/img/bg.png';

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loginStateService: LoginStateService
  ) {
    const loginStateModel: LoginStateModel = this.loginStateService.getLoginState();
    if (loginStateModel !== null) {
      this.router.navigate(['/' + loginStateModel.role]);
      return;
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.loginForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  login() {
    if (this.loginForm.valid) {
      const loginModel: LoginModel = new LoginModel(this.form.username.value, this.form.password.value);
      const code: number = this.authenticationService.authenticate(loginModel, this.userType);
      if (code === 1) {
        const url: any[] = ['/' + this.loginStateService.getLoginState().role];
        this.router.navigate(url);
      } else if (code === 2) {
        console.log('invalid credentials');
      } else {
        console.log('sorry you are deactivated');
      }
    }
  }
}
