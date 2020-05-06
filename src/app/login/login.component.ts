import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userType: string;
  loginForm: FormGroup;
  hide = true;
  image = 'assets/img/bg.png';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.loginForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
