import { Component, OnInit } from '@angular/core';
import { menuItems } from '../../constants/menu-items';
import { Router } from '@angular/router';
import { LoginStateService } from '../../service/login_state/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = menuItems;

  constructor(
    private loginStateService: LoginStateService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  logout() {
    this.loginStateService.destroySession(this.loginStateService.role);
    this.router.navigate(['/' + this.loginStateService.role + '/login']);
  }
}

