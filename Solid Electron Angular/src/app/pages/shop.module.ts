import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from 'src/app/pages/shop/shop.component';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { ShopEffects } from './state/shop.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/shop.reducer';
import { ProfileComponent } from './profile/profile.component';
import { OrderSuccessComponent } from './order-success/order-success.component';



const routes: Routes=[
  {
    path:'',
    component:ShopComponent },
  ]

@NgModule({
  declarations: [
  
    OrderSuccessComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    // child route olduğunu belirtiyoruz.
    RouterModule.forChild(routes),
    // shop effectle ve reducerla iletişim için gerekli tanımlamalar.
    EffectsModule.forFeature([ShopEffects]),
    StoreModule.forFeature('shop',reducer),
  ]
})
export class ShopModule { }
