import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CheckAuthEffects } from './store/effects/check-auth.effects';
import { SignInWithGoogleEffects } from './store/effects/sign-in-with-google.effects';
import { SignOutEffects } from './store/effects/sign-out.effects';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { SignInEffects } from './store/effects/sign-in.effects';
import { SignUpEffects } from './store/effects/sign-up.effects';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, reducer } from './store/reducer/auth.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';


const routes: Routes=[
  {path:'',
    component:LoginComponent 
}
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgToastModule,
    StoreModule.forFeature(authFeatureKey,reducer),
    CommonModule,RouterModule.forChild(routes), 
    // haberleşilen effectler
    EffectsModule.forFeature([CheckAuthEffects, SignInWithGoogleEffects, SignOutEffects, SignInEffects, SignUpEffects])
  ]
})
export class AuthModule { }
