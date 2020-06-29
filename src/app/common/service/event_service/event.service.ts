import { Injectable } from '@angular/core';
import { zuulOrganizationEventServiceBaseURL } from '../../constants/http-urls';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../../model/organization/EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private urlPath = zuulOrganizationEventServiceBaseURL;

  constructor(private http: HttpClient) { }

  async getAllEventsByOrgId(orgId: number): Promise<any> {
    return await this.http.get<EventModel>(this.urlPath + '/organization/' + orgId, { observe: 'response' }).toPromise();
  }

  async add(model: EventModel): Promise<any> {
    return await this.http.post<EventModel>(this.urlPath + '/', model, { observe: 'response' }).toPromise();
  }

  async update(model: EventModel): Promise<any> {
    return await this.http.put<EventModel>(this.urlPath + '/', model, { observe: 'response' }).toPromise();
  }

}

