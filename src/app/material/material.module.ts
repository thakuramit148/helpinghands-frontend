import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatSelectModule, MatSnackBarModule, MatDialogModule,
  MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatSortModule, MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatSortModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
