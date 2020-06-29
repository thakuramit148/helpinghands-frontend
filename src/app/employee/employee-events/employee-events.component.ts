import { EmployeeService } from 'src/app/common/service/employee_service/employee.service';
import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { EventService } from 'src/app/common/service/event_service/event.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';
import { EventModel } from 'src/app/common/model/organization/EventModel';
import { CalendarEventModel } from 'src/app/common/model/organization/CalendarEventModel';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-employee-events',
  templateUrl: './employee-events.component.html',
  styleUrls: ['./employee-events.component.css']
})
export class EmployeeEventsComponent implements OnInit {

  eventList: EventModel[];
  calendarPlugins = [dayGridPlugin];
  Events: CalendarEventModel[] = [];
  eventDetail: EventModel = null;

  constructor(
    private loginStateService: LoginStateService,
    private employeeService: EmployeeService,
    private router: Router,
    private eventService: EventService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let orgId: number;
    let resp = null;
    try {
      resp = await this.employeeService.getOrgIdForEmployee(this.loginStateService.getLoginState().id);
      orgId = resp.body.data;
      if (orgId > 0) {
        resp = await this.eventService.getAllEventsByOrgId(orgId);
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
}
