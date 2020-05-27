import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {

  title: string;
  constructor(
    private matDialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.title = data;
  }

  ngOnInit() {
  }

  confirm() {
    this.matDialogRef.close(true);
  }

  decline() {
    this.matDialogRef.close(false);
  }

}
