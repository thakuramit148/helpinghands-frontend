import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { StatesAndDistricts } from '../../common/constants/states-and-district';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  @Input() userType: string;
  signupForm: FormGroup;
  hide = true;
  image = 'assets/img/bg1.png';
  stateList = StatesAndDistricts;
  districts = [];

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    this.getDistrict();
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

  getDistrict() {
    this.signupForm.controls.state.valueChanges.subscribe(value => {
      if (!value) {
        this.districts = [];
      } else {
        this.districts = this.stateList.find(data => data.state === value).districts;
      }
    });
  }
}
