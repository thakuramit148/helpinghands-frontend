import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './common/component/header/header.component';
import { FooterComponent } from './common/component/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { OrganizationLoginComponent } from './organization/organization-login/organization-login.component';
import { OrganizationRegisterComponent } from './organization/organization-register/organization-register.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { AdminManageUserComponent } from './admin/admin-manage-user/admin-manage-user.component';
import { AdminManageOrganizationComponent } from './admin/admin-manage-organization/admin-manage-organization.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    routingComponent,
    UserLoginComponent,
    UserRegisterComponent,
    OrganizationLoginComponent,
    OrganizationRegisterComponent,
    EmployeeLoginComponent,
    AdminLoginComponent,
    AdminManageUserComponent,
    AdminManageOrganizationComponent,
    AdminReportsComponent,
    AdminManageUserComponent,
    AdminManageOrganizationComponent,
    AdminReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
