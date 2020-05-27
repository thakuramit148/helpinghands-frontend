import { Injectable } from '@angular/core';
import { UserModel } from '../../model/user/UserModel';
import { HttpClient } from '@angular/common/http';
import { zuulUserServiceBaseURL } from '../../constants/http-urls';
import { NewPasswordModel } from '../../model/newPassword/NewPasswordModel';
import { UserWithPasswordModel } from '../../model/user/UserWithPasswordModel';
import { OrganizationVolunteerModel } from '../../model/user/OrganizationVolunteerModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlPath = zuulUserServiceBaseURL;

  constructor(private http: HttpClient) { }

  async get(): Promise<any> {
    return await this.http.get<UserModel>(this.urlPath + '/', { observe: 'response' }).toPromise();
  }

  async getById(id: number): Promise<any> {
    return await this.http.get<UserModel>(this.urlPath + '/' + id, { observe: 'response' }).toPromise();
  }

  async getOrgVolByUserId(id: number): Promise<any> {
    return await this.http.get<OrganizationVolunteerModel>(this.urlPath + '/volunteered/' + id, { observe: 'response' }).toPromise();
  }

  async add(userModel: UserWithPasswordModel): Promise<any> {
    return await this.http.post<UserWithPasswordModel>(this.urlPath + '/', userModel, { observe: 'response' }).toPromise();
  }

  async update(userModel: UserModel): Promise<any> {
    return await this.http.put<UserModel>(this.urlPath + '/' + userModel.id, userModel, { observe: 'response' }).toPromise();
  }

  async updatePassword(newPasswordModel: NewPasswordModel): Promise<any> {
    return await this.http.put<NewPasswordModel>(this.urlPath + '/', newPasswordModel, { observe: 'response' }).toPromise();
  }

  async updateActiveStatus(id: number, isActive: boolean): Promise<any> {
    return await this.http.put<any>(this.urlPath + '/' + id + '/' + isActive, { observe: 'response' }).toPromise();
  }
}
