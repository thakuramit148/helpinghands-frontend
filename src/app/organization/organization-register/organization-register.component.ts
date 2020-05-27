import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { LoginStateModel } from 'src/app/common/model/login/LoginStateModel';
import { OrganizationService } from 'src/app/common/service/organization_service/organization.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { OrgWithPasswordModel } from '../../common/model/organization/OrgWithPasswordModel';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { NO_RESP } from '../../common/constants/error-message';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent implements OnInit {
  signupForm: FormGroup;
  image = 'assets/img/bg1.png';

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private router: Router,
    private orgService: OrganizationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    loginStateService.role = 'organization';
    const loginStateModel: LoginStateModel = this.loginStateService.getLoginState();
    if (loginStateModel !== null) {
      this.router.navigate(['/' + loginStateModel.role]);
      return;
    }
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.signupForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  async signup() {
    if (this.signupForm.valid) {
      let orgModel: OrgWithPasswordModel = new OrgWithPasswordModel();
      orgModel.id = 0;
      orgModel.username = this.form.username.value;
      orgModel.password = this.form.password.value;
      orgModel.fullname = this.form.fullname.value;
      orgModel.email = this.form.email.value;
      orgModel.phone = this.form.phone.value;
      orgModel.description = this.form.description.value;
      orgModel.active = false;
      orgModel.verified = false;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.orgService.add(orgModel);
        orgModel = resp.body.data;
        if (orgModel != null && orgModel.id > 0) {
          snackbarMsg = 'Your data has been successfully registered!';
          this.router.navigate(['/organization/login']);
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
