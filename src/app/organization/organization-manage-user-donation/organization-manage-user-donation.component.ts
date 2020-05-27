import { Component, OnInit, ViewChild } from '@angular/core';
import { RO } from '../../common/constants/roles';
import { UserDonationDetails } from '../../common/model/donation/UserDonationDetails';
import { DonationService } from '../../common/service/donation_service/donation.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { DonationDetails } from '../../common/model/donation/DonationDetails';
import { DonationDetailsComponent } from '../donation-details/donation-details.component';
import { ConfirmBoxComponent } from '../../common/component/confirm-box/confirm-box.component';

let userDonationData: UserDonationDetails[] = [];
let donationDetails: DonationDetails[] = [];

@Component({
  selector: 'app-organization-manage-user-donation',
  templateUrl: './organization-manage-user-donation.component.html',
  styleUrls: ['./organization-manage-user-donation.component.css']
})
export class OrganizationManageUserDonationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'categoriesNames'
    , 'dropType', 'donationDate', 'donationReceivedDate', 'status', 'edit'];
  dataSource: MatTableDataSource<DonationDetails> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loginStateService: LoginStateService,
    private donationService: DonationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    loginStateService.role = RO;
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
    let resp = null;
    try {
      resp = await this.donationService.getDonationDetailsByOrgId(this.loginStateService.getLoginState().id);
      userDonationModel = resp.body.data;
      if (userDonationModel) {
        dialogRef.close();
        return userDonationModel;
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
    if (model.dropType === 'Self' && status === 'Assigning') {
      status = 'Completed';
    }
    const dialogRef1 = this.dialog.open(ConfirmBoxComponent,
      {
        panelClass: 'no-padding-dialog',
        data: 'Do you want to update the status to "' + status + '" of donation Id ' + model.id
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
            resp = await this.donationService.updateStatus(model.id, status);
            const statusString = resp.message;
            if (statusString) {
              const index = donationDetails.findIndex(data => data.id === model.id);
              donationDetails[index].status = status;
              this.dataSource.data = donationDetails;
              snackbarMsg = statusString;
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
