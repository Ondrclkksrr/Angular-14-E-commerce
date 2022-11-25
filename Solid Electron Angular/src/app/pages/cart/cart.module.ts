import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { ShopEffects } from '../state/shop.effects';


const routes: Routes=
[
  { path:'',component:CartComponent }
]
    
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    // routesde bulunan routeların bir child route olduğunu belirtiyoruz.
    RouterModule.forChild(routes),
    //shop effectle iletişimde olabilmesi adına effecti import ediyoruz.
    EffectsModule.forFeature([ShopEffects]),
  ]
})
export class CartModule { }
