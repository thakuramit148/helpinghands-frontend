import { Injectable } from '@angular/core';
import { UserModel } from '../../model/user/UserModel';
import { HttpClient } from '@angular/common/http';
import { zuulUserServiceBaseURL } from '../../constants/http-urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlPath = zuulUserServiceBaseURL;

  constructor(private http: HttpClient) { }

  async addUser(userModel: UserModel): Promise<any> {
    return await this.http.post<UserModel>(this.urlPath + '/', userModel, { observe: 'response' }).toPromise();
  }
}
