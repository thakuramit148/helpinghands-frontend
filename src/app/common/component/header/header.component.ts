import { RO, RU } from './../../constants/roles';
import { Component, OnInit } from '@angular/core';
import { menuItems } from '../../constants/menu-items';
import { Router } from '@angular/router';
import { LoginStateService } from '../../service/login_state/login-state.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LoginStateModel } from 'src/app/common/model/login/LoginStateModel';
import { RA, RE } from '../../constants/roles';
import { EmployeeAddAndUpdateComponent } from '../../../employee/employee-add-and-update/employee-add-and-update.component';
import { LoadingComponent } from '../loading/loading.component';
import { EmployeeService } from '../../service/employee_service/employee.service';
import { UserService } from '../../service/user_service/user.service';
import { OrganizationService } from '../../service/organization_service/organization.service';
import { NO_RESP, getErrorMessage } from '../../constants/error-message';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { getSnackbarProperties } from '../../constants/snackbar-property';
import { EmployeeDetailsModel } from '../../model/employee/EmployeeDetailsModel';
import { UserModel } from '../../model/user/UserModel';
import { UserProfileUpdateComponent } from '../../../user/user-profile-update/user-profile-update.component';
import { OrganizationDetailModel } from '../../model/organization/OrganizationDetailModel';
import { OrganizationProfileUpdateComponent } from 'src/app/organization/organization-profile-update/organization-profile-update.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = menuItems;

  constructor(
    public loginStateService: LoginStateService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private empService: EmployeeService,
    private userService: UserService,
    private orgService: OrganizationService
  ) {
  }

  ngOnInit() {

  }

  async profile() {
    const loginState: LoginStateModel = this.loginStateService.getLoginState();
    if (loginState) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let empModel: EmployeeDetailsModel;
      let userModel: UserModel;
      let orgModel: OrganizationDetailModel;
      let resp = null;
      try {
        if (loginState.role === RU) {
          resp = await this.userService.getById(loginState.id);
          userModel = resp.body.data;
          if (userModel) {
            this.dialog.open(UserProfileUpdateComponent,
              { panelClass: 'no-padding-dialog', disableClose: true, data: userModel });
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } else if (loginState.role === RO) {
          resp = await this.orgService.getById(loginState.id);
          orgModel = resp.body.data;
          if (orgModel) {
            this.dialog.open(OrganizationProfileUpdateComponent,
              { panelClass: 'no-padding-dialog', disableClose: true, data: orgModel });
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } else if (loginState.role === RE) {
          resp = await this.empService.getByEmpId(loginState.id);
          empModel = resp.body.data;
          if (empModel) {
            this.dialog.open(EmployeeAddAndUpdateComponent,
              { panelClass: 'no-padding-dialog', disableClose: true, data: empModel });
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex);
        panelClass = 'red';
      } finally {
        dialogRef.close();
        if (snackbarMsg) {
          snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
            getSnackbarProperties(snackbarMsg, panelClass));
        }
      }
    }
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, { panelClass: 'no-padding-dialog' });
  }

  logout() {
    this.loginStateService.destroySession(this.loginStateService.role);
    this.router.navigate(['/' + this.loginStateService.role + '/login']);
  }

  isRoleAdmin() {
    const loginState: LoginStateModel = this.loginStateService.getLoginState();
    return loginState != null && loginState.role === RA;
  }

}

