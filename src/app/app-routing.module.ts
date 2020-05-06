import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OrganizationComponent } from './organization/organization.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'organization', component: OrganizationComponent },
  // { path: 'organization/login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent },
  // { path: 'employee/login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  // { path: 'admin/login', component: LoginComponent },
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
  EmployeeComponent,
  AdminComponent,
];
