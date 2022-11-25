import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { ShopEffects } from '../state/shop.effects';
import { ProfileComponent } from './profile.component';

const routes: Routes=[
  {
    path:'',
    component:ProfileComponent },
  ]

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    CommonModule,
    //child route olduğunu belitrme
    RouterModule.forChild(routes),
    //effectle iletişim
    EffectsModule.forFeature([ShopEffects])
  ]
})
export class ProfileModule { }
