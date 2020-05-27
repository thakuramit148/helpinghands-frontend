import { Injectable } from '@angular/core';
import { zuulAdminServiceBaseURL } from '../../constants/http-urls';
import { HttpClient } from '@angular/common/http';
import { NewPasswordModel } from '../../model/newPassword/NewPasswordModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlPath = zuulAdminServiceBaseURL;

  constructor(private http: HttpClient) { }

  async updatePassword(newPasswordModel: NewPasswordModel): Promise<any> {
    return await this.http.put<NewPasswordModel>(this.urlPath + '/', newPasswordModel, { observe: 'response' }).toPromise();
  }
}
