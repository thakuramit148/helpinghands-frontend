import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginStateService } from './common/service/login_state/login-state.service';
import { LoginStateModel } from './common/model/loginStateModel';
import { RU } from './common/constants/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public loginStateService: LoginStateService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data.roles as Array<string>;
    const loginState: LoginStateModel = this.loginStateService.getLoginState();
    if (loginState == null && roles[0] === RU) {
      return true;
    }
    if (!this.loginStateService.isLoginStateValidForUser(roles[0])) {
      return true;
    } else {
      this.router.navigate(['/' + roles[0] + '/login']);
      return false;
    }
  }
}
