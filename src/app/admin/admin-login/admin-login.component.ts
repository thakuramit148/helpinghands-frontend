import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RA } from 'src/app/common/constants/roles';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = RA;
  }

  ngOnInit() {
  }

}
