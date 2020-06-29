import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrganizationVolunteerModel } from 'src/app/common/model/user/OrganizationVolunteerModel';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { VolunteerService } from 'src/app/common/service/volunteer_service/volunteer.service';
import { UserService } from 'src/app/common/service/user_service/user.service';
import { DonationService } from 'src/app/common/service/donation_service/donation.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { UserDonationDetails } from 'src/app/common/model/donation/UserDonationDetails';
import { DonationDetails } from 'src/app/common/model/donation/DonationDetails';
import { RU } from 'src/app/common/constants/roles';
import { DonationDetailsComponent } from 'src/app/organization/donation-details/donation-details.component';
import { ConfirmBoxComponent } from 'src/app/common/component/confirm-box/confirm-box.component';

let userDonationData: UserDonationDetails[] = [];
let donationDetails: DonationDetails[] = [];

@Component({
  selector: 'app-user-pickup-tasks',
  templateUrl: './user-pickup-tasks.component.html',
  styleUrls: ['./user-pickup-tasks.component.css']
})
export class UserPickupTasksComponent implements OnInit {

  volunteerId: number;
  searchForm: FormGroup;
  organization: OrganizationVolunteerModel[];
  displayedColumns: string[] = ['id', 'fullname', 'categoriesNames'
    , 'dropType', 'donationDate', 'donationReceivedDate', 'status', 'edit'];
  dataSource: MatTableDataSource<DonationDetails> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private volunteerService: VolunteerService,
    private userService: UserService,
    private donationService: DonationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    loginStateService.role = RU;
    this.searchForm = this.fb.group({
      organization: ['']
    });
  }

  async ngOnInit() {
    await this.getOrganizationVolunteerDetails();
  }

  async getOrganizationVolunteerDetails() {
    let panelClass = 'green';
    let snackbarMsg = '';
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    try {
      const resp = await this.userService.getOrgVolByUserId(this.loginStateService.getLoginState().id);
      const model: OrganizationVolunteerModel[] = resp.body.data;
      if (model) {
        this.organization = model;
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

  get form() {
    return this.searchForm.controls;
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async onSubmit() {
    if (this.form.organization.value) {
      this.volunteerId = this.form.organization.value.volId;
      userDonationData = [];
      donationDetails = [];
      userDonationData = await this.getDonationDetials();
      if (userDonationData.length === 0) {
        this.snackbar.openFromComponent(SnackbarComponent,
          getSnackbarProperties('there are no pickup request for you', 'red'));
      }
      userDonationData.forEach(data => {
        const donationDetail: DonationDetails = new DonationDetails();
        donationDetail.id = data.id;
        donationDetail.userId = data.userId;
        donationDetail.pickupId = data.pickupId;
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
  }

  async getDonationDetials(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userDonationModel: UserDonationDetails[] = [];
    let resp = null;
    try {
      resp = await this.volunteerService.getDonationDetailsByVolId(this.volunteerId);
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
    const dialogRef1 = this.dialog.open(ConfirmBoxComponent,
      {
        panelClass: 'no-padding-dialog',
        data: 'Do you want to take this pickup request'
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
            console.log(model);

            resp = await this.volunteerService.updateVolunteerPickupStatus(model.pickupId, status, model.id);
            const pickupStatus = resp.message;
            console.log(pickupStatus);
            if (pickupStatus) {
              const index = donationDetails.findIndex(data => data.id === model.id);
              donationDetails[index].status = status;
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
