import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ConfirmedValidator } from './confirmed.validator';
import {AuthService} from "../auth/auth.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  title = 'Sign Up'

  form: FormGroup = new FormGroup({});
  success = false

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}


  ngOnInit(){
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      doubleCheckPass: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'doubleCheckPass')
    })

  }

  removeDoubleCheckPass(value:any){
    delete value['doubleCheckPass']
    return value
  }

  submit(){
    this.auth.registerUser(this.removeDoubleCheckPass(this.form.value))
      .subscribe(
        res=>console.log(res),
        err=>console.log(err)
      )
  }
}
