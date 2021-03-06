import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../common/service/authentication_service/authentication.service';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatSnackBarRef } from '@angular/material';
import { SnackbarComponent } from '../common/component/snackbar/snackbar.component';
import { LoadingComponent } from '../common/component/loading/loading.component';
import { LoginStateModel } from '../common/model/login/LoginStateModel';
import { LoginModel } from '../common/model/login/LoginModel';
import { getErrorMessage, NO_RESP } from '../common/constants/error-message';
import { getSnackbarProperties } from '../common/constants/snackbar-property';

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
    private loginStateService: LoginStateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
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

  async login() {
    if (this.loginForm.valid) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      let loginStateModel: LoginStateModel;
      const loginModel: LoginModel = new LoginModel(this.form.username.value, this.form.password.value);
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      try {
        const resp = await this.authenticationService.authenticate(loginModel, this.userType);
        loginStateModel = resp.body;
        if (loginStateModel != null) {
          if (loginStateModel.role === 'admin' || loginStateModel.active) {
            this.loginStateService.createSession(loginStateModel);
            sessionStorage.setItem('TOKEN', resp.headers.get('Authorization'));
            const url: any[] = ['/' + this.loginStateService.getLoginState().role];
            this.router.navigate(url);
          } else {
            if (this.loginStateService.role === 'organization') {
              snackbarMsg = 'sorry you are not verified yet or you have been blocked! please contact the admin';
            } else {
              snackbarMsg = 'sorry you have been blocked! please contact the admin';
            }
            panelClass = 'red';
          }
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex, 'login');
        panelClass = 'red';
      } finally {
        dialogRef.close();
      }
      if (snackbarMsg) {
        snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
          getSnackbarProperties(snackbarMsg, panelClass));
      }
    }
  }
}
