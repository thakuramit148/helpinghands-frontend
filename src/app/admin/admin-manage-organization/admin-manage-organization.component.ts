import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RA } from 'src/app/common/constants/roles';
import { UserModel } from 'src/app/common/model/user/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { OrganizationService } from '../../common/service/organization_service/organization.service';
import { OrganizationModel } from 'src/app/common/model/organization/OrganizationModel';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { NO_RESP } from '../../common/constants/error-message';

let orgData: OrganizationModel[] = [];

@Component({
  selector: 'app-admin-manage-organization',
  templateUrl: './admin-manage-organization.component.html',
  styleUrls: ['./admin-manage-organization.component.css']
})
export class AdminManageOrganizationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'fullname', 'email', 'phone', 'description', 'active', 'verified'];
  dataSource: MatTableDataSource<OrganizationModel> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loginStateService: LoginStateService,
    private orgService: OrganizationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    loginStateService.role = RA;
  }

  async ngOnInit() {
    orgData = await this.getOrganization();
    this.dataSource.data = orgData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getActiveStatus(id) {
    return orgData.find(obj => obj.id === id).active;
  }

  getVerifyStatus(id) {
    return orgData.find(obj => obj.id === id).verified;
  }

  async getOrganization(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserModel[] = [];
    let resp = null;
    try {
      resp = await this.orgService.get();
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

  async changeActiveStatus(id: number, isActive: boolean) {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let msg;
    let resp = null;
    try {
      resp = await this.orgService.updateActiveStatus(id, isActive);
      msg = resp.message;
      if (msg) {
        dialogRef.close();
        orgData.find(obj => obj.id === id).active = isActive;
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

  async changeVerifyStatus(id: number, isVerified: boolean) {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let msg;
    let resp = null;
    try {
      resp = await this.orgService.updateVerifyStatus(id, isVerified);
      msg = resp.message;
      if (msg) {
        dialogRef.close();
        orgData.find(obj => obj.id === id).verified = isVerified;
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
}
