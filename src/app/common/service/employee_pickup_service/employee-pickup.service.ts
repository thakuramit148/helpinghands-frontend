import { Injectable } from '@angular/core';
import { EmployeePickupModel } from '../../model/employee/EmployeePickupModel';
import { zuulEmployeePickupServiceBaseURL } from '../../constants/http-urls';
import { HttpClient } from '@angular/common/http';
import { UserDonationDetails } from '../../model/donation/UserDonationDetails';

@Injectable({
  providedIn: 'root'
})
export class EmployeePickupService {

  private urlPath = zuulEmployeePickupServiceBaseURL;

  constructor(private http: HttpClient) { }

  async add(model: EmployeePickupModel): Promise<any> {
    return await this.http.post<EmployeePickupModel>(this.urlPath + '/', model, { observe: 'response' }).toPromise();
  }

  async getDonationDetailsByEmpId(empId: number): Promise<any> {
    return await this.http.get<EmployeePickupModel>(this.urlPath + '/' + empId, { observe: 'response' }).toPromise();
  }

  async updateEmployeePickupStatus(pickupId: number, status: string, donationId: number): Promise<any> {
    return await this.http.put<string>(
      this.urlPath + '/' + pickupId + '/' + status + '/' + donationId
      , { observe: 'response' }).toPromise();
  }
}
