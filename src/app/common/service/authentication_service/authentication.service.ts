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
  }
}
