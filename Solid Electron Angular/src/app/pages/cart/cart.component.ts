import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgToastService } from 'ng-angular-popup';
import { Observable, pipe, Subscription} from 'rxjs';
import { BasketModel } from 'src/app/models/basket.model';
import { OrderModel } from 'src/app/models/order.model';
import { addOrder, deleteBasketItem, loadBasket } from '../state/shop.actions';
import { ShopState } from '../state/shop.reducer';
import { getBaskets$ } from '../state/shop.selectors';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public allBasketProducts$:Observable<BasketModel[]>;
  user: any;
  totalPrices:number =0;
  constructor(private store:Store<ShopState>, private toast:NgToastService) 
  {

  }
  ngOnInit(): void 
  {
  // basketı storedan ngrx selector yardımı ile çekiyoruz
  this.allBasketProducts$=this.store.pipe(select(getBaskets$));
  //mevcut giriş yapmış kullanıcıyı localstoragedan çekiyoruz.
  this.user = JSON.parse(localStorage.getItem('user'));
  //store a sepet yüklemek için gerekli actionu fırlatıyoruz.
  this.store.dispatch(loadBasket()); 
  setTimeout(() => this.totalPrice(), 1000);
  }
  // tetiklendiğinde sepetin o anki tutarını hesaplar.
  totalPrice()
  {
    this.totalPrices=0;
    var finalPrice =0;
    this.allBasketProducts$.forEach(x => {
      x.map((data)=>{
        if(data.uid == this.user.id)
       finalPrice+=data.price
      })
    }); 
    this.totalPrices=finalPrice; 
  }
  // sepetten tekli ürün silme
  // tıklanan ürünün ıdsine göre silme işlemi
  deleteBasketItem(productId:string)
  {
    this.toast.info({detail:'Ürün Silindi !',summary:'Ürün alışveriş sepetinizden silindi!.',duration:1000});
    this.store.dispatch(deleteBasketItem({deleteBasketProductId:productId}))
    this.totalPrice()
  }
  // tüm sepeti satın alma ve tüm sepeti silme
  //basket product observ ine subscribe olup tüm datayı mapleyip kullanıcıya ait olan ürünleri ona uygun bir modeldeki diziye atıp ordera pushluyoruz. Daha sonra alınan ürünleri sepetten siliyoruz.
  Order()
  {
      var basket:BasketModel[]=[]
      var subsc :Subscription;
      var Order:OrderModel[]=[];
      var totalPrc:number=0;
      subsc=this.allBasketProducts$.subscribe(pipe((data:BasketModel[])=>
    {
      for(let basketitems of data)
      {
        if(basketitems.uid == this.user.id)
        {  
          totalPrc += basketitems.price;
          basket.push(basketitems)   
        } 
      }
      Order.push({uid:this.user.id,orderPrice:totalPrc,products:basket, orderDate:new Date()});
      this.store.dispatch(addOrder({OrderDetail:Order}))
      for(let basketitems of basket)
      {
        this.store.dispatch(deleteBasketItem({deleteBasketProductId:basketitems.productid}))
      }
    }))
    subsc.unsubscribe();
  }
}
