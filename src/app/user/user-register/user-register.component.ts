import { LoginComponent } from './../../login/login.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { StatesAndDistricts } from '../../common/constants/states-and-district';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { RU } from '../../common/constants/roles';
import { LoginStateModel } from 'src/app/common/model/login/LoginStateModel';
import { UserService } from '../../common/service/user_service/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { UserWithPasswordModel } from 'src/app/common/model/user/UserWithPasswordModel';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { NO_RESP } from '../../common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  signupForm: FormGroup;
  image = 'assets/img/bg1.png';
  stateList = StatesAndDistricts;
  districts = [];

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private router: Router,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    const loginStateModel: LoginStateModel = this.loginStateService.getLoginState();
    if (loginStateModel !== null) {
      this.router.navigate(['/' + loginStateModel.role]);
      return;
    }
    loginStateService.role = RU;
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]+')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    this.getDistrict();
  }

  get form() {
    return this.signupForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  getDistrict() {
    this.signupForm.controls.state.valueChanges.subscribe(value => {
      if (!value) {
        this.districts = [];
      } else {
        this.districts = this.stateList.find(data => data.state === value).districts;
      }
    });
  }

  async signup() {
    if (this.signupForm.valid) {
      let userWithPasswordModel: UserWithPasswordModel = new UserWithPasswordModel();
      userWithPasswordModel.id = 0;
      userWithPasswordModel.username = this.form.username.value;
      userWithPasswordModel.password = this.form.password.value;
      userWithPasswordModel.fullname = this.form.fullname.value;
      userWithPasswordModel.email = this.form.email.value;
      userWithPasswordModel.phone = this.form.phone.value;
      userWithPasswordModel.address = this.form.address.value.trim() + '<>'
        + this.form.state.value + '--' + this.form.district.value;
      userWithPasswordModel.active = true;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.userService.add(userWithPasswordModel);
        userWithPasswordModel = resp.body.data;
        if (userWithPasswordModel != null && userWithPasswordModel.id > 0) {
          snackbarMsg = 'Your data has been successfully registered!';
          this.router.navigate(['/user/login']);
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex);
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
