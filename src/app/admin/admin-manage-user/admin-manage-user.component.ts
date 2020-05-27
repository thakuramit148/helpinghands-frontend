import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RA } from 'src/app/common/constants/roles';
import { UserModel } from 'src/app/common/model/user/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/common/service/user_service/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from '../../common/constants/snackbar-property';
import { NO_RESP } from '../../common/constants/error-message';

let userData: UserModel[] = [];

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css']
})
export class AdminManageUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'fullname', 'email', 'phone', 'address', 'active'];
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loginStateService: LoginStateService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    loginStateService.role = RA;
  }

  async ngOnInit() {
    userData = await this.getUsers();
    this.dataSource.data = userData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getActiveStatus(id) {
    return userData.find(obj => obj.id === id).active;
  }

  async changeActiveStatus(id: number, isActive: boolean) {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let msg;
    let resp = null;
    try {
      resp = await this.userService.updateActiveStatus(id, isActive);
      msg = resp.message;
      if (msg) {
        dialogRef.close();
        userData.find(obj => obj.id === id).active = isActive;
        snackbarMsg = msg;
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

  async getUsers(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserModel[] = [];
    let resp = null;
    try {
      resp = await this.userService.get();
      userModel = resp.body.data;
      if (userModel) {
        dialogRef.close();
        return userModel;
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
    return [];
  }
}
