import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { RA } from '../common/constants/roles';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private loginStateService: LoginStateService,
    private router: Router
  ) {
    loginStateService.role = RA;
    router.navigate(['/admin/manage-user']);
  }

  ngOnInit() {
  }

}
