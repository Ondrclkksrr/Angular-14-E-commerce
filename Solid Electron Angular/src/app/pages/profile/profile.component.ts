import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/models/order.model';
import { loadSignOuts } from 'src/app/modules/auth/store/actions/sign-out.actions';
import { getOrder } from '../state/shop.actions';
import { ShopState } from '../state/shop.reducer';
import { getOrders$ } from '../state/shop.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  public allOrders$:Observable<OrderModel[]>;
  constructor(private store:Store<ShopState>)
  {

  }
  ngOnInit(): void 
  {
    // order edilmiş ürünlerin aksiyonunu fırlatarak store u ayağa kaldırma, selector ile order edilmiş ürünleri alma,kullanıcıyı localden alma
    this.store.dispatch(getOrder());
    this.allOrders$= this.store.pipe(select(getOrders$));
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  logout()
  {
    //çıkış actionu fırlatılıyor.
    this.store.dispatch(loadSignOuts());
  }

}
