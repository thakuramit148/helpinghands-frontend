import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../service/organization_service/organization.service';
import { LoginStateService } from '../../service/login_state/login-state.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from '../../service/user_service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
    private orgService: OrganizationService,
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newConfPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  changePassword() {

  }
}
