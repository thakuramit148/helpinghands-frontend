import { EmployeePickupService } from './../common/service/employee_pickup_service/employee-pickup.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { RE } from '../common/constants/roles';
import { UserDonationDetails } from '../common/model/donation/UserDonationDetails';
import { DonationDetails } from '../common/model/donation/DonationDetails';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DonationService } from '../common/service/donation_service/donation.service';
import { LoadingComponent } from '../common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from '../common/constants/error-message';
import { SnackbarComponent } from '../common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from '../common/constants/snackbar-property';
import { DonationDetailsComponent } from '../organization/donation-details/donation-details.component';
import { ConfirmBoxComponent } from '../common/component/confirm-box/confirm-box.component';
import { EmployeeService } from '../common/service/employee_service/employee.service';
import { EmployeePickupModel } from '../common/model/employee/EmployeePickupModel';

let userDonationData: UserDonationDetails[] = [];
let donationDetails: DonationDetails[] = [];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'categoriesNames'
    , 'dropType', 'donationDate', 'donationReceivedDate', 'status', 'edit'];
  dataSource: MatTableDataSource<DonationDetails> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loginStateService: LoginStateService,
    private donationService: DonationService,
    private employeeService: EmployeeService,
    private employeePickupService: EmployeePickupService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    loginStateService.role = RE;
  }

  async ngOnInit() {
    userDonationData = [];
    donationDetails = [];
    userDonationData = await this.getDonationDetials();
    userDonationData.forEach(data => {
      const donationDetail: DonationDetails = new DonationDetails();
      donationDetail.id = data.id;
      donationDetail.orgId = data.orgId;
      donationDetail.orgName = data.orgName;
      donationDetail.dropType = data.dropType;
      donationDetail.donationDate = data.donationDate;
      donationDetail.donationReceivedDate = data.donationReceivedDate;
      donationDetail.status = data.status;
      donationDetail.description = data.description;
      donationDetail.donated = data.donated;
      donationDetail.categoriesNames = data.categoriesName.toString().replace(',', ', ');
      donationDetail.fullname = data.userDetails.fullname;
      donationDetail.address = data.userDetails.address;
      donationDetail.phone = data.userDetails.phone;
      donationDetails.push(donationDetail);
    });
    this.dataSource.data = donationDetails;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async getDonationDetials(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userDonationModel: UserDonationDetails[] = [];
    let orgId: number;
    let resp = null;
    try {
      resp = await this.employeeService.getOrgIdForEmployee(this.loginStateService.getLoginState().id);
      orgId = resp.body.data;
      if (orgId > 0) {
        resp = await this.donationService.getDonationDetailsByOrgId(orgId);
        userDonationModel = resp.body.data;
        if (userDonationModel) {
          dialogRef.close();
          return userDonationModel.filter(data => data.dropType === 'Pickup');
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } else {
        snackbarMsg = NO_RESP;
        panelClass = 'red';
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
    return [];
  }

  showDetails(data: DonationDetails) {
    this.dialog.open(DonationDetailsComponent,
      { panelClass: 'no-padding-dialog', data });
  }

  async updateStatus(model: DonationDetails, status: string) {
    const dialogRef1 = this.dialog.open(ConfirmBoxComponent,
      {
        panelClass: 'no-padding-dialog',
        data: 'Do you want to take this pickup request (id=' + model.id + ')'
      });
    const closeResp = await dialogRef1.afterClosed().toPromise();
    if (closeResp) {
      let panelClass = 'green';
      let snackbarMsg = '';
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.donationService.getDonationStatusById(model.id);
        const realStatus = resp.body.message;
        if (realStatus) {
          if (realStatus === model.status) {
            let pickupModel: EmployeePickupModel = new EmployeePickupModel();
            pickupModel.id = 0;
            pickupModel.empId = this.loginStateService.getLoginState().id;
            pickupModel.donationId = model.id;
            pickupModel.status = '';
            resp = await this.employeePickupService.add(pickupModel);
            pickupModel = resp.body.data;
            if (pickupModel) {
              const index = donationDetails.findIndex(data => data.id === pickupModel.donationId);
              donationDetails[index].status = 'In progress';
              this.dataSource.data = donationDetails;
              snackbarMsg = 'Successfully updated the status';
            } else {
              snackbarMsg = NO_RESP;
              panelClass = 'red';
            }
          } else {
            const index = donationDetails.findIndex(data => data.id === model.id);
            donationDetails[index].status = realStatus;
            this.dataSource.data = donationDetails;
            snackbarMsg = 'Status of this donation request has been updated by someone!';
            panelClass = 'red';
          }
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex);
        panelClass = 'red';
      } finally {
        dialogRef.close();
        if (snackbarMsg) {
          this.snackbar.openFromComponent(SnackbarComponent,
            getSnackbarProperties(snackbarMsg, panelClass));
        }
      }
    }
  }
}
