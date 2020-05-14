import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../../service/login_state/login-state.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  
  image = 'assets/img/notfound.jpg';

  constructor(private loginStateService: LoginStateService) {
    const role = loginStateService.getLoginState();
    if (role !== null) {
      loginStateService.role = role.role;
    } else {
      loginStateService.role = 'user';
    }
  }

  ngOnInit() {
  }

}
