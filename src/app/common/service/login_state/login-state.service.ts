import { Injectable } from '@angular/core';
import { LoginStateModel } from '../../model/loginStateModel';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  role = 'user';

  constructor() { }

  createSession(loginStateModel: LoginStateModel) {
    this.role = loginStateModel.role;
    sessionStorage.setItem('loginState', JSON.stringify(loginStateModel));
  }

  destroySession(role: string) {
    sessionStorage.removeItem('loginState');
    this.role = role;
  }

  getLoginState(): LoginStateModel {
    return JSON.parse(sessionStorage.getItem('loginState'));
  }

  isLoginStateValidForUser(currentUser: string): boolean {
    currentUser = currentUser.toLowerCase();
    const loginState: LoginStateModel = this.getLoginState();
    if (loginState === null ||
      (loginState != null && loginState.role !== currentUser)) {
      return true;
    } else {
      return false;
    }
  }
}
