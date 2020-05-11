import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { RE } from '../common/constants/roles';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private loginStateService: LoginStateService,
    private router: Router) {
    loginStateService.role = RE;
  }

  ngOnInit() {
  }

}
