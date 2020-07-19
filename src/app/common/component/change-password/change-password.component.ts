import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../service/organization_service/organization.service';
import { LoginStateService } from '../../service/login_state/login-state.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from '../../service/user_service/user.service';
import { NewPasswordModel } from '../../model/newPassword/NewPasswordModel';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { EmployeeService } from '../../service/employee_service/employee.service';
import { AdminService } from '../../service/admin_service/admin.service';
import { getSnackbarProperties } from '../../constants/snackbar-property';
import { getErrorMessage, NO_RESP } from '../../constants/error-message';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public loginStateService: LoginStateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private orgService: OrganizationService,
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private matDialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newConfPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  async changePassword() {
    if (this.changePasswordForm.valid) {
      const loginState = this.loginStateService.getLoginState();
      const newPasswordModel: NewPasswordModel = new NewPasswordModel();
      newPasswordModel.id = loginState.id;
      newPasswordModel.oldPassword = this.form.currentPassword.value;
      newPasswordModel.newPassword = this.form.newPassword.value;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        if (loginState.role === 'user') {
          resp = await this.userService.updatePassword(newPasswordModel);
        } else if (loginState.role === 'admin') {
          resp = await this.adminService.updatePassword(newPasswordModel);
        } else if (loginState.role === 'organization') {
          resp = await this.orgService.updatePassword(newPasswordModel);
        } else if (loginState.role === 'employee') {
          resp = await this.employeeService.updatePassword(newPasswordModel);
        }
        const msg = resp.body.message;
        if (msg) {
          snackbarMsg = msg + '! please login again.';
          this.loginStateService.destroySession(loginState.role);
          this.matDialogRef.close();
          this.router.navigate(['/' + loginState.role + '/login']);
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
