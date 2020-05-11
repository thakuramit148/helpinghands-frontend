import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { RU } from '../../common/constants/roles';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private loginStateService: LoginStateService) {
    loginStateService.role = RU;
  }

  ngOnInit() {
  }

}
