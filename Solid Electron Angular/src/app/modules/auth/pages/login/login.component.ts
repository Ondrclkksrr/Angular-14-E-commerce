import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCheckAuths } from '../../store/actions/check-auth.actions';
import { loadSignInWithGoogles } from '../../store/actions/sign-in-with-google.actions';
import { loadSignIns } from '../../store/actions/sign-in.actions';
import { State} from '../../store/reducer/auth.reducer';
import { getAuthLoading } from '../../store/selector/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  public authLoading: Observable<boolean>| undefined;
  public formValid: Observable<boolean>| undefined;
  constructor(private authStore: Store<State>) { }
  ngOnInit(): void 
  {
    // reactive form ile custom validation
    this.loginForm = new FormGroup({
        email: new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password : new FormControl(null,Validators.required)
    });
    this.authStore.dispatch(loadCheckAuths());
    this.authLoading = this.authStore.select(getAuthLoading)
  }
  // google ve normal giriş fonksiyonları store a dispatch
  signInWithGoogle()
  {
    this.authStore.dispatch(loadSignInWithGoogles());
  }
  signIn()
  {
    this.authStore.dispatch(loadSignIns({email:this.loginForm.get('email').value, password:this.loginForm.get('password').value}));
  }

}
