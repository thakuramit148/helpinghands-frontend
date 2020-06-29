import { EventModel } from './../../common/model/organization/EventModel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { CalendarEventModel } from '../../common/model/organization/CalendarEventModel';
import { EventService } from '../../common/service/event_service/event.service';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { NO_RESP, getErrorMessage } from 'src/app/common/constants/error-message';
import { SnackbarComponent } from 'src/app/common/component/snackbar/snackbar.component';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-property';

@Component({
  selector: 'app-organization-event',
  templateUrl: './organization-event.component.html',
  styleUrls: ['./organization-event.component.css']
})
export class OrganizationEventComponent implements OnInit {

  eventForm: FormGroup;
  minDate = new Date();
  endMinDate = new Date();

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private eventService: EventService,
    private datePipe: DatePipe,
    private matDialogRef: MatDialogRef<OrganizationEventComponent>,
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(300)]],
    });
    this.form.start.valueChanges.subscribe(data=>{
      this.endMinDate= new Date(data);
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.eventForm.controls;
  }

  async addEvent() {
    if (this.eventForm.valid) {
      let eventModel: EventModel = new EventModel();
      eventModel.id = 0;
      eventModel.name = this.form.title.value;
      eventModel.start = this.datePipe.transform(new Date(this.form.start.value), 'yyyy-MM-dd');
      eventModel.end = this.datePipe.transform(new Date(this.form.end.value), 'yyyy-MM-dd');
      eventModel.description = this.form.description.value;
      eventModel.orgId = this.loginStateService.getLoginState().id;
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.eventService.add(eventModel);
        eventModel = resp.body.data;
        if (eventModel.id > 0) {
          snackbarMsg = 'successfully added the event';
          this.matDialogRef.close(eventModel);
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
  }
}
