import { Injectable } from '@angular/core';
import { zuulOrganizationServiceBaseURL } from '../../constants/http-urls';
import { HttpClient } from '@angular/common/http';
import { OrganizationModel } from '../../model/organization/OrganizationModel';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private urlPath = zuulOrganizationServiceBaseURL;

  constructor(private http: HttpClient) { }

  async addOrganization(orgModel: OrganizationModel): Promise<any> {
    return await this.http.post<OrganizationModel>(this.urlPath + '/', orgModel, { observe: 'response' }).toPromise();
  }
}
