import { OrganizationDetailModel } from 'src/app/common/model/organization/OrganizationDetailModel';
import { Injectable } from '@angular/core';
import { zuulOrganizationServiceBaseURL } from '../../constants/http-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrganizationModel } from '../../model/organization/OrganizationModel';
import { NewPasswordModel } from '../../model/newPassword/NewPasswordModel';
import { OrgWithPasswordModel } from '../../model/organization/OrgWithPasswordModel';
import { OrganizationAddressModel } from '../../model/organization/OrganizationAddressModel';
import { OrganizationCategoryModel } from '../../model/organization/OrganizationCategoryModel';
import { OrganizationCategoryRefrenceModel } from '../../model/organization/OrganizationCategoryRefrenceModel';
import { OrganizationSearchModel } from '../../model/organization/OrganizationSearchModel';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private urlPath = zuulOrganizationServiceBaseURL;

  constructor(private http: HttpClient) { }

  async get(): Promise<any> {
    return await this.http.get<OrganizationModel>(this.urlPath + '/', { observe: 'response' }).toPromise();
  }

  async getById(orgId: number): Promise<any> {
    return await this.http.get<OrganizationDetailModel>(this.urlPath + '/' + orgId + '/details', { observe: 'response' }).toPromise();
  }

  async add(orgModel: OrgWithPasswordModel): Promise<any> {
    return await this.http.post<OrgWithPasswordModel>(this.urlPath + '/', orgModel, { observe: 'response' }).toPromise();
  }

  async getOrganizationDetails(model: OrganizationSearchModel): Promise<any> {
    return await this.http.post<OrganizationDetailModel>(this.urlPath + '/search', model, { observe: 'response' }).toPromise();
  }

  async updatePassword(newPasswordModel: NewPasswordModel): Promise<any> {
    return await this.http.put<NewPasswordModel>(this.urlPath + '/', newPasswordModel, { observe: 'response' }).toPromise();
  }

  async update(id: number, model: OrganizationModel): Promise<any> {
    return await this.http.put<OrganizationModel>(this.urlPath + '/' + id, model, { observe: 'response' }).toPromise();
  }

  async updateActiveStatus(id: number, isActive: boolean): Promise<any> {
    return await this.http.put<any>(this.urlPath + '/' + id + '/active/' + isActive, { observe: 'response' }).toPromise();
  }

  async updateVerifyStatus(id: number, isVerified: boolean): Promise<any> {
    return await this.http.put<any>(this.urlPath + '/' + id + '/verify/' + isVerified, { observe: 'response' }).toPromise();
  }

  async addAddress(orgAddressModel: OrganizationAddressModel): Promise<any> {
    return await this.http.post<OrganizationAddressModel>(this.urlPath + '/address', orgAddressModel, { observe: 'response' }).toPromise();
  }

  async updateAddress(orgAddressModel: OrganizationAddressModel): Promise<any> {
    return await this.http.put<OrganizationAddressModel>(this.urlPath + '/address/' + orgAddressModel.id
      , orgAddressModel, { observe: 'response' }).toPromise();
  }

  async getCategories(): Promise<any> {
    return await this.http.get<OrganizationCategoryModel>(this.urlPath + '/categories', { observe: 'response' }).toPromise();
  }

  async getCategoriesByOrgId(id: number): Promise<any> {
    return await this.http.get<OrganizationCategoryModel>(this.urlPath + '/categories/' + id, { observe: 'response' }).toPromise();
  }

  async addCategories(model: OrganizationCategoryRefrenceModel): Promise<any> {
    return await this.http.post<OrganizationCategoryRefrenceModel>(this.urlPath + '/category', model
      , { observe: 'response' }).toPromise();
  }
}

