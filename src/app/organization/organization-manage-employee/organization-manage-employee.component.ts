import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RO } from 'src/app/common/constants/roles';
import { EmployeeModel } from 'src/app/common/model/employee/EmployeeModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { EmployeeService } from 'src/app/common/service/employee_service/employee.service';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { NO_RESP } from '../../common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { EmployeeAddAndUpdateComponent } from '../../employee/employee-add-and-update/employee-add-and-update.component';
import { take } from 'rxjs/operators';

let empData: EmployeeModel[] = [];

@Component({
  selector: 'app-organization-manage-employee',
  templateUrl: './organization-manage-employee.component.html',
  styleUrls: ['./organization-manage-employee.component.css']
})
export class OrganizationManageEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'fullname', 'email', 'phone', 'address', 'active'];
  dataSource: MatTableDataSource<EmployeeModel> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loginStateService: LoginStateService,
    private empService: EmployeeService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    loginStateService.role = RO;
  }

  async ngOnInit() {
    empData = await this.getEmployee();
    this.dataSource.data = empData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getActiveStatus(id) {
    return empData.find(obj => obj.id === id).active;
  }

  async getEmployee(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let employeeModel: EmployeeModel[] = [];
    let resp = null;
    try {
      resp = await this.empService.getByOrgId(this.loginStateService.getLoginState().id);
      employeeModel = resp.body.data;
      if (employeeModel) {
        dialogRef.close();
        return employeeModel;
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
      resp = await this.empService.updateActiveStatus(id, isActive);
      msg = resp.message;
      if (msg) {
        dialogRef.close();
        empData.find(obj => obj.id === id).active = isActive;
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

  openEmployeeForm() {
    const dialogRef = this.dialog.open(EmployeeAddAndUpdateComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        empData.push(data);
        this.dataSource.data = empData;
      }
    });
  }
}
