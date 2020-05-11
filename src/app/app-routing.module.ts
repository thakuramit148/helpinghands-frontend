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

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuard], data: { roles: ['organization'] } },
  { path: 'organization/login', component: OrganizationLoginComponent },
  { path: 'organization/register', component: OrganizationRegisterComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard], data: { roles: ['employee'] } },
  { path: 'employee/login', component: EmployeeLoginComponent },
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
