import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { ShopEffects } from '../state/shop.effects';
import { OrderDetailComponent } from './order-detail.component';

const routes: Routes=[
  {
    path:'',
    component:OrderDetailComponent },
  ]

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    //roteların child route olduğunu belirtiyoruz.
    RouterModule.forChild(routes),
    //İletişim kurabilmek adına shop effecti import ediyoruz.
    EffectsModule.forFeature([ShopEffects])
  ]
})
export class OrderDetailModule { }
