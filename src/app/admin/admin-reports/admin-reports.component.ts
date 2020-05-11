import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RA } from 'src/app/common/constants/roles';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = RA;
  }

  ngOnInit() {
  }

}
