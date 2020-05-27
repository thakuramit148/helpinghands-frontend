import { OrganizationDetailModel } from 'src/app/common/model/organization/OrganizationDetailModel';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css']
})
export class OrganizationDetailsComponent implements OnInit {

  orgModel: OrganizationDetailModel;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: OrganizationDetailModel
  ) {
    this.orgModel = data;
  }

  ngOnInit() {
  }

}
