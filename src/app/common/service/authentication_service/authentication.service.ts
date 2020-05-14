import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginModel } from '../../model/login/LoginModel';
import { LoginStateModel } from '../../model/login/LoginStateModel';
import { authenticationServiceURL } from '../../constants/http-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private urlPath = authenticationServiceURL;

  constructor(
    private loginStateService: LoginStateService,
    private http: HttpClient
  ) { }

  async authenticate(loginModel: LoginModel, role: string): Promise<any> {
    loginModel.username = loginModel.username + '<>' + role;
    return await this.http.post<LoginStateModel>(this.urlPath, loginModel, { observe: 'response' }).toPromise();
    //   if (role === 'user') {
    //     if (loginModel.username === 'user123' && loginModel.password === '123456') {
    //       const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'user', true);
    //       if (loginStateModel.status) {
    //         this.loginStateService.createSession(loginStateModel);
    //         return 1;
    //       }
    //       return 3;
    //     } else {
    //       return 2;
    //     }
    //   } else if (role === 'organization') {
    //     if (loginModel.username === 'org123' && loginModel.password === '123456') {
    //       const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'organization', true);
    //       if (loginStateModel.status) {
    //         this.loginStateService.createSession(loginStateModel);
    //         return 1;
    //       }
    //       return 3;
    //     } else {
    //       return 2;
    //     }
    //   } else if (role === 'employee') {
    //     if (loginModel.username === 'emp123' && loginModel.password === '123456') {
    //       const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'employee', true);
    //       if (loginStateModel.status) {
    //         this.loginStateService.createSession(loginStateModel);
    //         return 1;
    //       }
    //       return 3;
    //     } else {
    //       return 2;
    //     }
    //   } else if (role === 'admin') {
    //     if (loginModel.username === 'admin123' && loginModel.password === '123456') {
    //       const loginStateModel: LoginStateModel = new LoginStateModel(1, loginModel.username, 'admin', true);
    //       if (loginStateModel.status) {
    //         this.loginStateService.createSession(loginStateModel);
    //         return 1;
    //       }
    //       return 3;
    //     } else {
    //       return 2;
    //     }
    //   }
  }
}
