import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { OrganizationCategoryModel } from '../../common/model/organization/OrganizationCategoryModel';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { OrganizationService } from 'src/app/common/service/organization_service/organization.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationAddressComponent } from '../organization-address/organization-address.component';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { OrganizationCategoryRefrenceModel } from '../../common/model/organization/OrganizationCategoryRefrenceModel';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';

@Component({
  selector: 'app-organization-category',
  templateUrl: './organization-category.component.html',
  styleUrls: ['./organization-category.component.css']
})
export class OrganizationCategoryComponent implements OnInit {

  catForm: FormGroup;
  categoryList: OrganizationCategoryModel[];

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private orgService: OrganizationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<OrganizationAddressComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: OrganizationCategoryModel[]
  ) {
    this.categoryList = data;
    this.catForm = this.fb.group({
      category: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.catForm.controls;
  }

  async addCategory() {
    if (this.catForm.valid) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let model: OrganizationCategoryRefrenceModel;
      let resp = null;
      try {
        model = {
          id: 0, orgCatId: this.form.category.value
          , orgId: this.loginStateService.getLoginState().id
        };
        resp = await this.orgService.addCategories(model);
        model = resp.body.data;
        if (model) {
          dialogRef.close();
          snackbarMsg = 'Category succesfully added';
          this.matDialogRef.close(this.categoryList.find(data => data.id === this.form.category.value).name);
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

