import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Store } from '@ngrx/store';
import { loadSignups } from '../../store/actions/signup.actions';
import { State} from '../../store/reducer/auth.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm : FormGroup;
  constructor(private authStore: Store<State>) { }

  ngOnInit(): void 
  {
    //reactive form ile custom validaiton
    this.signUpForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password : new FormControl(null,Validators.required)
  });
  }
  //giriş fonksiyonu store a dispatch
  signUp()
  {
    this.authStore.dispatch(loadSignups({email:this.signUpForm.get('email').value,password:this.signUpForm.get('password').value}));
  }

}
