import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RE } from 'src/app/common/constants/roles';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = RE;
  }

  ngOnInit() {
  }

}
