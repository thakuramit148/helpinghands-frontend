import { UserService } from './../../common/service/user_service/user.service';
import { StatesAndDistricts } from './../../common/constants/states-and-district';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/common/service/organization_service/organization.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationDetailModel } from 'src/app/common/model/organization/OrganizationDetailModel';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { OrganizationCategoryModel } from 'src/app/common/model/organization/OrganizationCategoryModel';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { OrganizationSearchModel } from '../../common/model/organization/OrganizationSearchModel';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { LoginStateService } from '../../common/service/login_state/login-state.service';
import { UserDonationComponent } from '../user-donation/user-donation.component';
import { LoginStateModel } from 'src/app/common/model/login/LoginStateModel';
import { RU } from 'src/app/common/constants/roles';
import { Router } from '@angular/router';
import { ConfirmBoxComponent } from '../../common/component/confirm-box/confirm-box.component';
import { VolunteerService } from 'src/app/common/service/volunteer_service/volunteer.service';
import { VolunteerModel } from '../../common/model/user/VolunteerModel';

@Component({
  selector: 'app-user-search-organization',
  templateUrl: './user-search-organization.component.html',
  styleUrls: ['./user-search-organization.component.css']
})
export class UserSearchOrganizationComponent implements OnInit {

  searchForm: FormGroup;
  stateList = StatesAndDistricts;
  categories: OrganizationCategoryModel[];
  orgDetails: OrganizationDetailModel[];
  clearButton = false;
  formSubmit = false;
  searchTitle = 'Search for a organization near you. donate, volunteer, and spread happiness!';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginStateService,
    private orgService: OrganizationService,
    private volunteerService: VolunteerService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    const loginStateModel: LoginStateModel = this.loginService.getLoginState();
    if (loginStateModel !== null && loginStateModel.role !== RU) {
      this.router.navigate(['/' + loginStateModel.role]);
    }
    this.searchForm = this.fb.group({
      state: [''],
      category: [''],
    });
  }

  async ngOnInit() {
    await this.addNewCategory();
    await this.getOrganizationDetails(null);
    this.checkFilter();
  }

  get form() {
    return this.searchForm.controls;
  }

  checkFilter() {
    this.form.state.valueChanges.subscribe(d => {
      this.clearButton = true;
    });
    this.form.category.valueChanges.subscribe(d => {
      this.clearButton = true;
    });
  }

  async addNewCategory() {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    try {
      const resp = await this.orgService.getCategories();
      const categories: OrganizationCategoryModel[] = resp.body.data;
      if (categories) {
        this.categories = categories;
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
  }

  onClear() {
    this.form.state.patchValue('');
    this.form.category.patchValue('');
    this.clearButton = false;
    this.formSubmit = false;
  }

  async onSubmit() {
    if (this.formSubmit) {
      const category: number[] = this.form.category.value;
      const state: string[] = this.form.state.value;
      if (category.length > 0 || state.length > 0) {
        this.searchTitle = 'Showing data for ';
      }
      if (category.length > 0) {
        this.searchTitle += 'categories (';
        const cat = ('' + this.form.category.value).split(',');
        let i = 0;
        const catvalue = cat.map(data => {
          if ((i++) === cat.length - 1) {
            return this.categories[+data - 1].name;
          }
          return this.categories[+data - 1].name;
        }).toString();
        this.searchTitle += catvalue + ')';
      }
      if (state.length > 0) {
        if (category.length > 0) {
          this.searchTitle += ' and ';
        }
        this.searchTitle += 'location (' + this.form.state.value + ')';
      }
      if (category.length === 0 && state.length === 0) {
        this.searchTitle = '';
      }
      if (category.length > 0 || state.length > 0) {
        const model: OrganizationSearchModel = new OrganizationSearchModel();
        model.categoriesId = category ? category : [];
        model.state = state ? state : [];
        await this.getOrganizationDetails(model);
      }
    }
  }

  async getOrganizationDetails(model: OrganizationSearchModel) {
    if (model === null) {
      model = new OrganizationSearchModel();
      model.categoriesId = [];
      model.state = [];
    }
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    try {
      const resp = await this.orgService.getOrganizationDetails(model);
      const orgDetailModel: OrganizationDetailModel[] = resp.body.data;
      if (orgDetailModel) {
        this.orgDetails = orgDetailModel;
      } else {
        snackbarMsg = resp.body.message;
        this.searchTitle += ' - Sorry! ' + snackbarMsg;
        this.orgDetails = [];
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
  }

  openDetailBox(data: OrganizationDetailModel) {
    this.dialog.open(OrganizationDetailsComponent,
      { panelClass: 'no-padding-dialog', data });
  }

  openDonationBox(data: OrganizationDetailModel) {
    if (this.checkLoginState()) {
      this.dialog.open(UserDonationComponent,
        { panelClass: 'no-padding-dialog', data });
    }
  }

  async openVolunteerBox(org: OrganizationDetailModel) {
    if (this.checkLoginState()) {
      const dialogRef1 = this.dialog.open(ConfirmBoxComponent,
        {
          panelClass: 'no-padding-dialog',
          data: 'Do you want to Volunteer for this organization.'
        });
      const closeResp = await dialogRef1.afterClosed().toPromise();
      if (closeResp) {
        let panelClass = 'green';
        let snackbarMsg = '';
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        try {
          const volunteer: VolunteerModel = new VolunteerModel();
          volunteer.id = 0;
          volunteer.orgId = org.id;
          volunteer.userId = this.loginService.getLoginState().id;
          volunteer.approved = true;
          const resp = await this.volunteerService.add(volunteer);
          const volModel: VolunteerModel = resp.body.data;
          if (volModel) {
            snackbarMsg = 'You are successfully added as a volunteer for this organization';
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

  checkLoginState(): boolean {
    if (this.loginService.getLoginState() === null) {
      this.snackbar.openFromComponent(SnackbarComponent,
        getSnackbarProperties('Please login first!', 'red'));
      return false;
    }
    return true;
  }
}

