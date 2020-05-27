import { LoadingComponent } from './../../common/component/loading/loading.component';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { OrganizationAddressModel } from '../../common/model/organization/OrganizationAddressModel';
import { StatesAndDistricts } from 'src/app/common/constants/states-and-district';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { OrganizationService } from 'src/app/common/service/organization_service/organization.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';

@Component({
  selector: 'app-organization-address',
  templateUrl: './organization-address.component.html',
  styleUrls: ['./organization-address.component.css']
})
export class OrganizationAddressComponent implements OnInit {

  addForm: FormGroup;
  stateList = StatesAndDistricts;
  districts = [];
  addressArray: string[];
  orgAddressModel: OrganizationAddressModel;
  activeStatus = true;

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private orgService: OrganizationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<OrganizationAddressComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: OrganizationAddressModel
  ) {
    this.orgAddressModel = this.data;
    if (data) {
      this.addForm = this.fb.group({
        id: [{ value: this.orgAddressModel.id, disabled: true }],
        state: [this.orgAddressModel.state, [Validators.required]],
        district: ['', [Validators.required]],
        address: [this.orgAddressModel.area, [Validators.required, Validators.minLength(20)
          , Validators.maxLength(200), Validators.pattern('[0-9a-zA-z ,-/\\\.]+')]],
      });
      this.activeStatus = this.orgAddressModel.active;
    } else {
      this.addForm = this.fb.group({
        state: ['', [Validators.required]],
        district: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)
          , Validators.pattern('[0-9a-zA-z ,-/\\\.]+')]],
      });
    }
  }

  ngOnInit() {
    this.getDistrict();
    this.setDistrict();
    if (this.orgAddressModel) {
      this.addForm.controls.district.setValue(this.orgAddressModel.city);
    }
  }

  get form() {
    return this.addForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  getDistrict() {
    this.addForm.controls.state.valueChanges.subscribe(value => {
      if (!value) {
        this.districts = [];
      } else {
        this.districts = this.stateList.find(data => data.state === value).districts;
      }
    });
  }

  setDistrict() {
    const value = this.addForm.controls.state.value;
    if (value) {
      this.districts = this.stateList.find(data => data.state === value).districts;
    }
  }

  changeActiveStatus() {
    this.activeStatus = !this.activeStatus;
  }

  getActiveStatus() {
    return this.activeStatus;
  }

  async addAddress() {
    if (this.addForm.valid) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let orgModel: OrganizationAddressModel;
      let resp = null;
      try {
        if (!this.data) {
          this.orgAddressModel = {
            id: 0, orgId: this.loginStateService.getLoginState().id, area: this.form.address.value
            , state: this.form.state.value, city: this.form.district.value, active: true
          };
          resp = await this.orgService.addAddress(this.orgAddressModel);
          orgModel = resp.body.data;
          if (orgModel) {
            dialogRef.close();
            snackbarMsg = 'Address succesfully added';
            this.matDialogRef.close(orgModel);
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } else {
          this.orgAddressModel = {
            id: this.form.id.value, orgId: this.loginStateService.getLoginState().id
            , area: this.form.address.value, state: this.form.state.value
            , city: this.form.district.value, active: this.getActiveStatus()
          };
          resp = await this.orgService.updateAddress(this.orgAddressModel);
          orgModel = resp.body.data;
          if (orgModel) {
            dialogRef.close();
            snackbarMsg = 'Successfully updated the address';
            this.matDialogRef.close(orgModel);
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
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
