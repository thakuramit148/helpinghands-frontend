import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { RU } from '../common/constants/roles';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private loginStateService: LoginStateService,
    private router: Router
  ) {
    loginStateService.role = RU;
  }

  ngOnInit() {
  }

}
