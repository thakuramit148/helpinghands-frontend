import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { RO } from '../common/constants/roles';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  constructor(
    private loginStateService: LoginStateService,
    private router: Router
  ) {
    loginStateService.role = RO;
    // if (this.loginStateService.isLoginStateValidForUser(RO)) {
    //   this.router.navigate(['/' + RO + '/login']);
    //   return;
    // }
  }

  ngOnInit() {
  }

}
