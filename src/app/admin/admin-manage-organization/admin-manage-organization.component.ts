import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RA } from 'src/app/common/constants/roles';

@Component({
  selector: 'app-admin-manage-organization',
  templateUrl: './admin-manage-organization.component.html',
  styleUrls: ['./admin-manage-organization.component.css']
})
export class AdminManageOrganizationComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = RA;
  }
  ngOnInit() {
  }

}
