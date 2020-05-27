import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationDetailModel } from 'src/app/common/model/organization/OrganizationDetailModel';
import { DonationDetails } from 'src/app/common/model/donation/DonationDetails';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {

  model: DonationDetails;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DonationDetails
  ) {
    this.model = data;
  }

  ngOnInit() {
  }

}
