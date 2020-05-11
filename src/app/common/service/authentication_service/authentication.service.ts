import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../model/loginModel';
import { LoginStateModel } from '../../model/loginStateModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private loginStateService: LoginStateService) { }

  //returns 1 : successfull login
  //returns 2 : invalid credentials
  //returns 3 : when user is deactivated
  authenticate(loginModel: LoginModel, role: string): number {
    if (role === 'user') {
      if (loginModel.username === 'user123' && loginModel.password === '123456') {
        const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'user', true);
        if (loginStateModel.status) {
          this.loginStateService.createSession(loginStateModel);
          return 1;
        }
        return 3;
      } else {
        return 2;
      }
    } else if (role === 'organization') {
      if (loginModel.username === 'org123' && loginModel.password === '123456') {
        const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'organization', true);
        if (loginStateModel.status) {
          this.loginStateService.createSession(loginStateModel);
          return 1;
        }
        return 3;
      } else {
        return 2;
      }
    } else if (role === 'employee') {
      if (loginModel.username === 'emp123' && loginModel.password === '123456') {
        const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'employee', true);
        if (loginStateModel.status) {
          this.loginStateService.createSession(loginStateModel);
          return 1;
        }
        return 3;
      } else {
        return 2;
      }
    } else if (role === 'admin') {
      if (loginModel.username === 'admin123' && loginModel.password === '123456') {
        const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'admin', true);
        if (loginStateModel.status) {
          this.loginStateService.createSession(loginStateModel);
          return 1;
        }
        return 3;
      } else {
        return 2;
      }
    }
  }
}
