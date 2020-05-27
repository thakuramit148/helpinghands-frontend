import { OrganizationAddressComponent } from './../organization-address/organization-address.component';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationDetailModel } from '../../common/model/organization/OrganizationDetailModel';
import { OrganizationService } from '../../common/service/organization_service/organization.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationAddressModel } from '../../common/model/organization/OrganizationAddressModel';
import { OrganizationCategoryComponent } from '../organization-category/organization-category.component';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { OrganizationCategoryModel } from '../../common/model/organization/OrganizationCategoryModel';
import { OrganizationModel } from '../../common/model/organization/OrganizationModel';

@Component({
  selector: 'app-organization-profile-update',
  templateUrl: './organization-profile-update.component.html',
  styleUrls: ['./organization-profile-update.component.css']
})
export class OrganizationProfileUpdateComponent implements OnInit {

  orgForm: FormGroup;
  addressArray: string[];
  orgUpdateModel: OrganizationDetailModel;

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<OrganizationProfileUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: OrganizationDetailModel
  ) {
    this.orgUpdateModel = data;
    this.orgForm = this.fb.group({
      orgId: [{ value: this.orgUpdateModel.id, disabled: true }],
      username: [{ value: this.orgUpdateModel.username, disabled: true }, [Validators.required
        , Validators.minLength(6), Validators.maxLength(50)]],
      fullname: [this.orgUpdateModel.fullname, [Validators.required, Validators.minLength(6)
        , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      phone: [this.orgUpdateModel.phone, [Validators.required, Validators.minLength(10)
        , Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      email: [this.orgUpdateModel.email, [Validators.required, Validators.email, Validators.maxLength(200)]],
      description: [this.orgUpdateModel.description, [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.orgForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  closeDialogBox() {
    this.matDialogRef.close();
  }

  addNewAddress() {
    const dialogRef = this.dialog.open(OrganizationAddressComponent);
    dialogRef.afterClosed().toPromise().then(data => {
      console.log(data);
      if (data) {
        this.orgUpdateModel.address.push(data);
      }
    });
  }

  editAddress(address: OrganizationAddressModel) {
    const dialogRef = this.dialog.open(OrganizationAddressComponent, { data: address });
    dialogRef.afterClosed().toPromise().then(data => {
      console.log(data);
      if (data) {
        const index = this.orgUpdateModel.address.findIndex(d => data.id === d.id);
        console.log(index);
        this.orgUpdateModel.address[index] = data;
      }
    });
  }

  async addNewCategory() {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const length = this.orgUpdateModel.categories.length;
    const dialogRef1 = this.dialog.open(LoadingComponent, { disableClose: true });
    try {
      const resp = await this.orgService.getCategories();
      let categories: OrganizationCategoryModel[] = resp.body.data;
      if (length === categories.length) {
        snackbarMsg = 'All the categories are linked in your organization';
        panelClass = 'red';
      } else {
        if (categories) {
          categories = categories.filter(data => {
            if (!this.orgUpdateModel.categories.includes(data.name)) {
              return data;
            }
          });
          const dialogRef = this.dialog.open(OrganizationCategoryComponent
            , { data: categories });
          dialogRef.afterClosed().toPromise().then(data => {
            if (data) {
              this.orgUpdateModel.categories.push(data);
            }
          });
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      }
    } catch (ex) {
      snackbarMsg = getErrorMessage(ex);
      panelClass = 'red';
    } finally {
      dialogRef1.close();
      if (snackbarMsg) {
        snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
          getSnackbarProperties(snackbarMsg, panelClass));
      }
    }
  }

  async updateOrganization() {
    if (this.orgForm.valid) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      let model: OrganizationModel;
      model = {
        id: this.form.orgId.value, username: this.form.username.value,
        fullname: this.form.fullname.value, phone: this.form.phone.value,
        email: this.form.email.value, description: this.form.description.value,
        active: true, verified: true
      };
      console.log(model);
      // return;
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      try {
        const resp = await this.orgService.update(model.id, model);
        model = resp.body.data;
        if (model) {
          snackbarMsg = 'Successfully updated tyour details';
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
  }
}

