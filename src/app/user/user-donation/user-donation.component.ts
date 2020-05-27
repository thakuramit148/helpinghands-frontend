import { UserModel } from 'src/app/common/model/user/UserModel';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { OrganizationDetailModel } from 'src/app/common/model/organization/OrganizationDetailModel';
import { OrganizationCategoryModel } from 'src/app/common/model/organization/OrganizationCategoryModel';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { OrganizationService } from 'src/app/common/service/organization_service/organization.service';
import { NO_RESP } from '../../common/constants/error-message';
import { DonationService } from 'src/app/common/service/donation_service/donation.service';
import { UserDonationDetails } from '../../common/model/donation/UserDonationDetails';
import { UserService } from '../../common/service/user_service/user.service';
import { UserDonationCategory } from '../../common/model/donation/UserDonationCategory';

@Component({
  selector: 'app-user-donation',
  templateUrl: './user-donation.component.html',
  styleUrls: ['./user-donation.component.css']
})
export class UserDonationComponent implements OnInit {

  donationForm: FormGroup;
  categories: OrganizationCategoryModel[];
  orgDetailModel: OrganizationDetailModel;

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private donationService: DonationService,
    private orgService: OrganizationService,
    private userService: UserService,
    private matDialogRef: MatDialogRef<UserDonationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: OrganizationDetailModel
  ) {
    this.orgDetailModel = data;
    this.donationForm = this.fb.group({
      dropType: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    });
  }

  async ngOnInit() {
    let panelClass = 'green';
    let snackbarMsg = '';
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    try {
      const resp = await this.orgService.getCategoriesByOrgId(this.orgDetailModel.id);
      const orgDetailModel: OrganizationCategoryModel[] = resp.body.data;
      if (orgDetailModel) {
        this.categories = orgDetailModel;
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
    return this.donationForm.controls;
  }

  async donate() {
    if (this.donationForm.valid) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let userModel: UserModel;
      const userId = this.loginStateService.getLoginState().id;
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      try {
        const resp1 = await this.userService.getById(userId);
        userModel = resp1.body.data;
        const categoryArray: number[] = this.form.category.value;
        const userDonationCategory: UserDonationCategory[] = [];
        categoryArray.forEach(data => {
          userDonationCategory.push({ id: 0, donationId: 0, donationCategoryId: data });
        });
        let model: UserDonationDetails = new UserDonationDetails();
        model.id = 0;
        model.userId = userId;
        model.orgId = this.orgDetailModel.id;
        model.dropType = this.form.dropType.value;
        model.description = this.form.description.value;
        model.categories = userDonationCategory;
        snackbarMsg = '';
        panelClass = 'green';
        const resp = await this.donationService.add(model);
        model = resp.body.data;
        if (model) {
          snackbarMsg = 'Your donation request has been succesfully registered';
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex);
        panelClass = 'red';
      } finally {
        dialogRef.close();
        this.matDialogRef.close();
        if (snackbarMsg) {
          this.snackbar.openFromComponent(SnackbarComponent,
            getSnackbarProperties(snackbarMsg, panelClass));
        }
      }
    }
  }
}
