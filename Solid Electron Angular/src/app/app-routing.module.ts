import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { SignupComponent } from './modules/auth/pages/signup/signup.component';
import { VerifyEmailComponent } from './modules/auth/pages/verify-email/verify-email.component';
import { HomeComponent } from './pages/home/home.component';
import { EmailLoginGuardGuard} from './modules/auth/guards/email-login-guard.guard';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';

/* gerekli yönlendirmeleri ; guardlar,child durumları lazy loadingi kullanarak yapıyoruz*/
const routes: Routes = [
  {path: 'signup', component: SignupComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'verify-email', component: VerifyEmailComponent },
  {path:'', component:HomeComponent},
  {path:'login', loadChildren: ()=>import('./modules/auth/auth.module').then(mod=>mod.AuthModule)},
  {path:'ordersuccess', component:OrderSuccessComponent,canActivate: [EmailLoginGuardGuard] },
  {path:'shop', loadChildren: ()=>import('./pages/shop.module').then(mod=>mod.ShopModule),canActivate: [EmailLoginGuardGuard] },
  {path:'prod/:id', loadChildren: ()=>import('./pages/product-details/product-details.module').then(mod=>mod.ProductDetailsModule),canActivate: [EmailLoginGuardGuard] },
  {path:'cart', loadChildren: ()=>import('./pages/cart/cart.module').then(mod=>mod.CartModule),canActivate: [EmailLoginGuardGuard] },
  {path: 'profile', loadChildren: ()=>import('./pages/profile/profile.module').then(mod=>mod.ProfileModule),canActivate: [EmailLoginGuardGuard] },
  {path:'order-detail/:id', loadChildren: ()=>import('./pages/order-detail/order-detail.module').then(mod=>mod.OrderDetailModule),canActivate: [EmailLoginGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
