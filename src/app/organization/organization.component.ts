import { CalendarEventModel } from './../common/model/organization/CalendarEventModel';
import { EventService } from './../common/service/event_service/event.service';
import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { RO } from '../common/constants/roles';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventModel } from '../common/model/organization/EventModel';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from '../common/component/loading/loading.component';
import { EmployeeModel } from '../common/model/employee/EmployeeModel';
import { NO_RESP, getErrorMessage } from '../common/constants/error-message';
import { SnackbarComponent } from '../common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from '../common/constants/snackbar-property';
import { OrganizationEventComponent } from './organization-event/organization-event.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  eventList: EventModel[] = [];
  calendarPlugins = [dayGridPlugin];
  Events: CalendarEventModel[] = [];
  eventDetail: EventModel = null;

  constructor(
    private loginStateService: LoginStateService,
    private router: Router,
    private eventService: EventService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    loginStateService.role = RO;
  }

  async ngOnInit() {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let resp = null;
    try {
      resp = await this.eventService.getAllEventsByOrgId(this.loginStateService.getLoginState().id);
      this.eventList = resp.body.data;
      if (this.eventList) {
        this.eventList.forEach(data => {
          const event: CalendarEventModel = new CalendarEventModel();
          event.id = data.id;
          event.title = data.name;
          event.start = data.start;
          event.end = data.end;
          this.Events = this.Events.concat(event);
        });
      } else {
        snackbarMsg = NO_RESP;
        panelClass = 'red';
      }
    } catch (ex) {
      snackbarMsg = getErrorMessage(ex);
      panelClass = 'red';
    } finally {
      dialogRef.close();
      if (snackbarMsg) {
        snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
          getSnackbarProperties(snackbarMsg, panelClass));
      }
    }
  }

  eventClick(info) {
    this.eventDetail = this.eventList.find(data => data.id == info.event.id);
  }

  addNewEvent() {
    const dialogRef = this.dialog.open(OrganizationEventComponent,
      { panelClass: 'no-padding-dialog' });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.eventList.push(data);
        const event: CalendarEventModel = new CalendarEventModel();
        event.id = data.id;
        event.title = data.name;
        event.start = data.start;
        event.end = data.end + ' 24:00';
        this.Events = this.Events.concat(event);
      }
    });
  }
}
