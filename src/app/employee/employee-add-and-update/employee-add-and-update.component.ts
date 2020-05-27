import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeDetailsModel } from 'src/app/common/model/employee/EmployeeDetailsModel';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { NO_RESP } from '../../common/constants/error-message';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { EmployeeService } from '../../common/service/employee_service/employee.service';
import { StatesAndDistricts } from 'src/app/common/constants/states-and-district';

@Component({
  selector: 'app-employee-add-and-update',
  templateUrl: './employee-add-and-update.component.html',
  styleUrls: ['./employee-add-and-update.component.css']
})
export class EmployeeAddAndUpdateComponent implements OnInit {

  empForm: FormGroup;
  empDetailsModel: EmployeeDetailsModel;
  empUpdateDetailsModel: EmployeeDetailsModel;
  stateList = StatesAndDistricts;
  districts = [];
  addressArray: string[];
  state: string;
  district: string;

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private empService: EmployeeService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<EmployeeAddAndUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EmployeeDetailsModel
  ) {
    this.empUpdateDetailsModel = this.data;
    if (data) {
      this.addressArray = this.empUpdateDetailsModel.address.split('<>');
      const address = this.addressArray[0];
      this.state = this.addressArray[1].split('--')[0].trim();
      this.district = this.addressArray[1].split('--')[1].trim();

      this.empForm = this.fb.group({
        orgId: [{ value: this.empUpdateDetailsModel.orgId, disabled: true }],
        username: [{ value: this.empUpdateDetailsModel.username, disabled: true }],
        fullname: [this.empUpdateDetailsModel.fullname, [Validators.required, Validators.minLength(6)
          , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
        phone: [this.empUpdateDetailsModel.phone, [Validators.required, Validators.minLength(10)
          , Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
        email: [this.empUpdateDetailsModel.email, [Validators.required, Validators.email, Validators.maxLength(200)]],
        state: [this.state, [Validators.required]],
        district: ['', [Validators.required]],
        address: [address, [Validators.required, Validators.minLength(20)
          , Validators.maxLength(200), Validators.pattern('[0-9a-zA-z ,-/\\\.]+')]],
      });
    } else {
      this.empForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
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
    this.empForm.controls.district.setValue(this.district);
  }

  get form() {
    return this.empForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  getDistrict() {
    this.empForm.controls.state.valueChanges.subscribe(value => {
      if (!value) {
        this.districts = [];
      } else {
        this.districts = this.stateList.find(data => data.state === value).districts;
      }
    });
  }

  setDistrict() {
    const value = this.empForm.controls.state.value;
    if (value) {
        this.districts = this.stateList.find(data => data.state === value).districts;
    }
  }

  async addEmployee() {
    if (this.empForm.valid) {
      if (!this.empUpdateDetailsModel) {
        this.empDetailsModel = new EmployeeDetailsModel();
        this.empDetailsModel.id = 0;
        this.empDetailsModel.username = this.form.username.value;
        this.empDetailsModel.password = this.form.password.value;
        this.empDetailsModel.fullname = this.form.fullname.value;
        this.empDetailsModel.phone = this.form.phone.value;
        this.empDetailsModel.email = this.form.email.value;
        this.empDetailsModel.address = this.form.address.value.trim() + '<>'
          + this.form.state.value + '--' + this.form.district.value;
        this.empDetailsModel.active = false;
        this.empDetailsModel.orgId = this.loginStateService.getLoginState().id;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.empService.add(this.empDetailsModel);
          this.empDetailsModel = resp.body.data;
          if (this.empDetailsModel != null && this.empDetailsModel.id > 0) {
            snackbarMsg = 'Employee successfully added!';
            this.matDialogRef.close(this.empDetailsModel);
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
      } else {
        this.empUpdateDetailsModel.fullname = this.form.fullname.value;
        this.empUpdateDetailsModel.phone = this.form.phone.value;
        this.empUpdateDetailsModel.email = this.form.email.value;
        this.empUpdateDetailsModel.address = this.form.address.value.trim() + '<>'
          + this.form.state.value + '--' + this.form.district.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.empService.update(this.empUpdateDetailsModel);
          this.empUpdateDetailsModel = resp.body.data;
          if (this.empUpdateDetailsModel != null) {
            snackbarMsg = 'Profile successfully updated!';
            this.matDialogRef.close();
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

  closeDialogBox() {
    this.matDialogRef.close();
  }
}
