import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RA } from 'src/app/common/constants/roles';

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css']
})
export class AdminManageUserComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = RA;
  }

  ngOnInit() {
  }

}
