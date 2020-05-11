import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginStateService } from 'src/app/common/service/login_state/login-state.service';
import { Router } from '@angular/router';
import { LoginStateModel } from 'src/app/common/model/loginStateModel';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent implements OnInit {
  signupForm: FormGroup;
  image = 'assets/img/bg1.png';

  constructor(
    private fb: FormBuilder,
    private loginStateService: LoginStateService,
    private router: Router
  ) {
    loginStateService.role = 'organization';
    const loginStateModel: LoginStateModel = this.loginStateService.getLoginState();
    if (loginStateModel !== null) {
      this.router.navigate(['/' + loginStateModel.role]);
      return;
    }
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.signupForm.controls;
  }

  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      console.log('error');
    }
  }

  reset(field: string) {
    this.form[field].setValue('');
  }
}
