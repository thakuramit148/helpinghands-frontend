import { NgModule } from '@angular/core';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule
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
