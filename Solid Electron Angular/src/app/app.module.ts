import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import{AngularFireAuthModule} from '@angular/fire/compat/auth'
import{AngularFireModule} from '@angular/fire/compat'
import { AuthService } from './modules/auth/services/auth.service';
import { SıgnedInGuard } from './modules/auth/guards/sıgned-in.guard';
import { SıgnedOutGuard } from './modules/auth/guards/sıgned-out.guard';
import { CheckAuthEffects } from './modules/auth/store/effects/check-auth.effects';
import { SignOutEffects } from './modules/auth/store/effects/sign-out.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { reducer } from './pages/state/shop.reducer';
import { FilterPipe } from './pipes/filter.pipe';
import { DetailPipe } from './pipes/detail.pipe';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { basketFilterPipe } from './pipes/basketFilter.pipe';
import { orderFilterPipe } from './pipes/orderFilter.pipe';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    //pipeları ve componentleri declare ediyoruz.
    AppComponent,
    HomeComponent,
    ShopComponent,
    NavbarComponent,
    CartComponent,
    ProductDetailsComponent,
    FilterPipe,
    DetailPipe,
    basketFilterPipe,
    orderFilterPipe,
    ProfileComponent,
    OrderDetailComponent,
  ],
  imports: [
    //kullanılan tüm modülleri ekliyoruz.
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forFeature('shop',reducer),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({shop:reducer}),
    EffectsModule.forFeature([CheckAuthEffects, SignOutEffects])
  ],
  providers: [AuthService,SıgnedInGuard,SıgnedOutGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
