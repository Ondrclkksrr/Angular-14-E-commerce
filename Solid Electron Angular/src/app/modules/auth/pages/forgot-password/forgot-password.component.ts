import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService : AuthService) { }
  forgotForm : FormGroup;
  ngOnInit(): void 
  {
    //reactive form yapısı ile custom validation
    this.forgotForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  }
  // servis dosyasındaki hatırlatma fonksiyonunu tetikliyoruz.
  forgotPassword()
  {
    this.authService.ForgotPassword(this.forgotForm.get('email').value);
  }

}
