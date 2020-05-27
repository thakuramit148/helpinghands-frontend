import { VolunteerPickupModel } from './../../model/user/VolunteerPickupModel';
import { Injectable } from '@angular/core';
import { zuulVolunteerServiceBaseURL } from '../../constants/http-urls';
import { HttpClient } from '@angular/common/http';
import { VolunteerModel } from '../../model/user/VolunteerModel';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private urlPath = zuulVolunteerServiceBaseURL;

  constructor(private http: HttpClient) { }

  async add(model: VolunteerModel): Promise<any> {
    return await this.http.post<VolunteerModel>(this.urlPath + '/', model, { observe: 'response' }).toPromise();
  }

  async addPickup(model: VolunteerPickupModel): Promise<any> {
    return await this.http.post<VolunteerPickupModel>(this.urlPath + '/pickup', model, { observe: 'response' }).toPromise();
  }

  async getDonationDetailsByVolId(volId: number): Promise<any> {
    return await this.http.get<VolunteerPickupModel>(this.urlPath + '/pickup/' + volId, { observe: 'response' }).toPromise();
  }

  async updateVolunteerPickupStatus(pickupId: number, status: string, donationId: number): Promise<any> {
    return await this.http.put<string>(
      this.urlPath + '/pickup/' + pickupId + '/' + status + '/' + donationId
      , { observe: 'response' }).toPromise();
  }
}
