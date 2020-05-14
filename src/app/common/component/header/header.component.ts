import { Component, OnInit } from '@angular/core';
import { menuItems } from '../../constants/menu-items';
import { Router } from '@angular/router';
import { LoginStateService } from '../../service/login_state/login-state.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = menuItems;

  constructor(
    private loginStateService: LoginStateService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {

  }

  profile() { }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, { panelClass: 'no-padding-dialog' });
  }

  logout() {
    this.loginStateService.destroySession(this.loginStateService.role);
    this.router.navigate(['/' + this.loginStateService.role + '/login']);
  }

}

