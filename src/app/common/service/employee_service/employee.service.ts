import { Injectable } from '@angular/core';
import { zuulEmployeeServiceBaseURL } from '../../constants/http-urls';
import { HttpClient } from '@angular/common/http';
import { NewPasswordModel } from '../../model/newPassword/NewPasswordModel';
import { EmployeeModel } from '../../model/employee/EmployeeModel';
import { EmployeeDetailsModel } from '../../model/employee/EmployeeDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private urlPath = zuulEmployeeServiceBaseURL;

  constructor(private http: HttpClient) { }

  async getOrgIdForEmployee(id: number): Promise<any> {
    return await this.http.get<number>(this.urlPath + '/' + id + '/organizationId/', { observe: 'response' }).toPromise();
  }

  async getByOrgId(id: number): Promise<any> {
    return await this.http.get<EmployeeModel>(this.urlPath + '/orgId/' + id, { observe: 'response' }).toPromise();
  }

  async getByEmpId(id: number): Promise<any> {
    return await this.http.get<EmployeeDetailsModel>(this.urlPath + '/' + id, { observe: 'response' }).toPromise();
  }

  async add(employeeModel: EmployeeModel): Promise<any> {
    return await this.http.post<EmployeeModel>(this.urlPath + '/', employeeModel, { observe: 'response' }).toPromise();
  }

  async update(employeeModel: EmployeeDetailsModel): Promise<any> {
    return await this.http.put<EmployeeDetailsModel>(this.urlPath + '/' + employeeModel.id
      , employeeModel, { observe: 'response' }).toPromise();
  }

  async updatePassword(newPasswordModel: NewPasswordModel): Promise<any> {
    return await this.http.put<NewPasswordModel>(this.urlPath + '/', newPasswordModel, { observe: 'response' }).toPromise();
  }

  async updateActiveStatus(id: number, isActive: boolean): Promise<any> {
    return await this.http.put<any>(this.urlPath + '/' + id + '/' + isActive, { observe: 'response' }).toPromise();
  }

}

