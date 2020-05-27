import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OrganizationComponent } from './organization/organization.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { NotFoundComponent } from './common/component/not-found/not-found.component';
import { OrganizationLoginComponent } from './organization/organization-login/organization-login.component';
import { OrganizationRegisterComponent } from './organization/organization-register/organization-register.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { AdminManageUserComponent } from './admin/admin-manage-user/admin-manage-user.component';
import { AdminManageOrganizationComponent } from './admin/admin-manage-organization/admin-manage-organization.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { OrganizationManageEmployeeComponent } from './organization/organization-manage-employee/organization-manage-employee.component';
import { UserSearchOrganizationComponent } from './user/user-search-organization/user-search-organization.component';
import {
  OrganizationManageUserDonationComponent
} from './organization/organization-manage-user-donation/organization-manage-user-donation.component';
import { UserDonationHistoryComponent } from './user/user-donation-history/user-donation-history.component';
import { UserVolunteerTasksComponent } from './user/user-volunteer-tasks/user-volunteer-tasks.component';
import { EmployeePickupTasksComponent } from './employee/employee-pickup-tasks/employee-pickup-tasks.component';
import { UserPickupTasksComponent } from './user/user-pickup-tasks/user-pickup-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/organization', component: UserSearchOrganizationComponent },
  { path: 'user/donation-history', component: UserDonationHistoryComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'user/volunteer-task', component: UserVolunteerTasksComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'user/pick-task', component: UserPickupTasksComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuard], data: { roles: ['organization'] } },
  { path: 'organization/login', component: OrganizationLoginComponent },
  { path: 'organization/register', component: OrganizationRegisterComponent },
  {
    path: 'organization/manage-employee', component: OrganizationManageEmployeeComponent
    , canActivate: [AuthGuard], data: { roles: ['organization'] }
  },
  {
    path: 'organization/manage-user-donation', component: OrganizationManageUserDonationComponent
    , canActivate: [AuthGuard], data: { roles: ['organization'] }
  },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard], data: { roles: ['employee'] } },
  { path: 'employee/login', component: EmployeeLoginComponent },
  { path: 'employee/pickup-tasks', component: EmployeePickupTasksComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/manage-user', component: AdminManageUserComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'admin/manage-organization', component: AdminManageOrganizationComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'admin/report', component: AdminReportsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  UserComponent,
  UserLoginComponent,
  UserRegisterComponent,
  UserSearchOrganizationComponent,
  OrganizationComponent,
  OrganizationLoginComponent,
  OrganizationRegisterComponent,
  EmployeeComponent,
  EmployeeLoginComponent,
  AdminComponent,
  AdminLoginComponent,
  AdminManageUserComponent,
  AdminManageOrganizationComponent,
  AdminReportsComponent,
  NotFoundComponent,
];
