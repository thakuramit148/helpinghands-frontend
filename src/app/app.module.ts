import { HttpInterceptorService } from './common/service/http_interceptor/http-interceptor.service';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackbarComponent } from './common/component/snackbar/snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { LoadingComponent } from './common/component/loading/loading.component';
import { ChangePasswordComponent } from './common/component/change-password/change-password.component';
import { ProfileComponent } from './common/component/profile/profile.component';
import { OrganizationManageEmployeeComponent } from './organization/organization-manage-employee/organization-manage-employee.component';
import { EmployeeAddAndUpdateComponent } from './employee/employee-add-and-update/employee-add-and-update.component';
import { UserProfileUpdateComponent } from './user/user-profile-update/user-profile-update.component';
import { UserSearchOrganizationComponent } from './user/user-search-organization/user-search-organization.component';
import { OrganizationProfileUpdateComponent } from './organization/organization-profile-update/organization-profile-update.component';
import { OrganizationAddressComponent } from './organization/organization-address/organization-address.component';
import { OrganizationCategoryComponent } from './organization/organization-category/organization-category.component';
import { OrganizationDetailsComponent } from './user/organization-details/organization-details.component';
import { UserDonationComponent } from './user/user-donation/user-donation.component';
import {
  OrganizationManageUserDonationComponent
} from './organization/organization-manage-user-donation/organization-manage-user-donation.component';
import { DonationDetailsComponent } from './organization/donation-details/donation-details.component';
import { ConfirmBoxComponent } from './common/component/confirm-box/confirm-box.component';
import { UserDonationHistoryComponent } from './user/user-donation-history/user-donation-history.component';
import { UserVolunteerTasksComponent } from './user/user-volunteer-tasks/user-volunteer-tasks.component';
import { EmployeePickupTasksComponent } from './employee/employee-pickup-tasks/employee-pickup-tasks.component';
import { UserPickupTasksComponent } from './user/user-pickup-tasks/user-pickup-tasks.component';

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
    AdminReportsComponent,
    SnackbarComponent,
    LoadingComponent,
    ChangePasswordComponent,
    ProfileComponent,
    OrganizationManageEmployeeComponent,
    EmployeeAddAndUpdateComponent,
    UserProfileUpdateComponent,
    UserSearchOrganizationComponent,
    OrganizationProfileUpdateComponent,
    OrganizationAddressComponent,
    OrganizationCategoryComponent,
    OrganizationDetailsComponent,
    UserDonationComponent,
    OrganizationManageUserDonationComponent,
    DonationDetailsComponent,
    ConfirmBoxComponent,
    UserDonationHistoryComponent,
    UserVolunteerTasksComponent,
    EmployeePickupTasksComponent,
    UserPickupTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SnackbarComponent,
    LoadingComponent,
    ChangePasswordComponent,
    ProfileComponent,
    EmployeeAddAndUpdateComponent,
    UserProfileUpdateComponent,
    OrganizationProfileUpdateComponent,
    OrganizationAddressComponent,
    OrganizationCategoryComponent,
    OrganizationDetailsComponent,
    UserDonationComponent,
    DonationDetailsComponent,
    ConfirmBoxComponent
  ]
})
export class AppModule { }
