import { zuulDonationServiceBaseURL } from './../../constants/http-urls';
import { Injectable } from '@angular/core';
import { UserDonationDetails } from '../../model/donation/UserDonationDetails';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private urlPath = zuulDonationServiceBaseURL;

  constructor(private http: HttpClient) { }

  async add(model: UserDonationDetails): Promise<any> {
    return await this.http.post<UserDonationDetails>(this.urlPath + '/user', model, { observe: 'response' }).toPromise();
  }

  async getDonationDetailsByOrgId(orgId: number): Promise<any> {
    return await this.http.get<UserDonationDetails>(this.urlPath + '/organization/' + orgId, { observe: 'response' }).toPromise();
  }

  async getDonationDetailsByUserId(userId: number): Promise<any> {
    return await this.http.get<UserDonationDetails>(this.urlPath + '/user/' + userId, { observe: 'response' }).toPromise();
  }

  async updateStatus(donationId: number, status: string): Promise<any> {
    return await this.http.put<string>(this.urlPath + '/status/' + donationId + '/' + status, { observe: 'response' }).toPromise();
  }

  async getDonationStatusById(donationId: number): Promise<any> {
    return await this.http.get<string>(this.urlPath + '/status/' + donationId, { observe: 'response' }).toPromise();
  }

}

