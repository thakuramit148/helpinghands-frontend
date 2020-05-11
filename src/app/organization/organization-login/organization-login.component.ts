import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';

@Component({
  selector: 'app-organization-login',
  templateUrl: './organization-login.component.html',
  styleUrls: ['./organization-login.component.css']
})
export class OrganizationLoginComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = 'organization';
  }

  ngOnInit() {
  }

}
