import { UserModel } from './../../common/model/user/UserModel';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/common/service/user_service/user.service';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { StatesAndDistricts } from 'src/app/common/constants/states-and-district';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {

  userForm: FormGroup;
  userModel: UserModel;
  stateList = StatesAndDistricts;
  districts = [];
  addressArray: string[];
  state: string;
  district: string;

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<UserProfileUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {
    this.userModel = data;
    this.addressArray = this.userModel.address.split('<>');
    const address = this.addressArray[0];
    this.state = this.addressArray[1].split('--')[0].trim();
    this.district = this.addressArray[1].split('--')[1].trim();

    this.userForm = this.fb.group({
      id: [{ value: this.userModel.id, disabled: true }],
      username: [{ value: this.userModel.username, disabled: true }],
      fullname: [this.userModel.fullname, [Validators.required, Validators.minLength(6)
        , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      phone: [this.userModel.phone, [Validators.required, Validators.minLength(10)
        , Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      email: [this.userModel.email, [Validators.required, Validators.email, Validators.maxLength(200)]],
      state: [this.state, [Validators.required]],
      district: ['', [Validators.required]],
      address: [address, [Validators.required, Validators.minLength(20)
        , Validators.maxLength(200), Validators.pattern('[0-9a-zA-z ,-/\\\.]+')]]
    });
  }

  ngOnInit() {
    this.getDistrict();
    this.setDistrict();
    this.userForm.controls.district.setValue(this.district);
  }

  get form() {
    return this.userForm.controls;
  }

  getDistrict() {
    this.userForm.controls.state.valueChanges.subscribe(value => {
      if (!value) {
        this.districts = [];
      } else {
        this.districts = this.stateList.find(data => data.state === value).districts;
      }
    });
  }

  setDistrict() {
    const value = this.userForm.controls.state.value;
    if (value) {
      this.districts = this.stateList.find(data => data.state === value).districts;
    }
  }

  async updateUser() {
    if (this.userForm.valid) {
      this.userModel.fullname = this.form.fullname.value;
      this.userModel.phone = this.form.phone.value;
      this.userModel.email = this.form.email.value;
      this.userModel.address = this.form.address.value.trim() + '<>'
        + this.form.state.value + '--' + this.form.district.value;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.userService.update(this.userModel);
        this.userModel = resp.body.data;
        if (this.userModel != null) {
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

  closeDialogBox() {
    this.matDialogRef.close();
  }
}

