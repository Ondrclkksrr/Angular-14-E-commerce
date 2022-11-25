import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgToastService } from 'ng-angular-popup';
import { map, mergeMap } from 'rxjs';
import { ShopService } from '../shop.service';
import {  addBasket, addBasketSuccess, addOrder, addOrderSuccess, deleteBasketItem, deleteBasketItemSuccess, getOrder, getOrderFailure, getOrderSuccess, loadBasket, loadBasketFailure, loadBasketSuccess, loadShops, loadShopsFailure, loadShopsSuccess } from './shop.actions';



@Injectable()
export class ShopEffects {

  constructor(private actions$: Actions , private shopService :ShopService, private toast:NgToastService) 
  {

  }
  // gelen actionlara göre işlem yapan effectler ve toast notificationlar
  getProducts$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(loadShops),
      mergeMap((action) =>{
        return this.shopService.fetchProducts().pipe(
          map((products)=>{
            if(products)
            {
              return loadShopsSuccess({products});
            }
            else
            {
              this.toast.warning({detail:'Ürünler yüklenemedi !',summary:'Birşeyler hatalı gitti.!',duration:1000});
              return loadShopsFailure({error:'Birşeyler hatalı gitti!'})
            }     
        }));
     })
    );
  });

  addBasket$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(addBasket),
      mergeMap((action) =>{
        return this.shopService.addToBasket(action.basketProduct).pipe(
          map((basketProduct)=>{
            if(basketProduct)
            {
              this.toast.success({detail:'Ürün Sepete eklendi !',summary:'Ürünlerinizi sepetinizde görüntüleyebilirsiniz.',duration:1000});
              return addBasketSuccess();
            }
            else
            {
              this.toast.warning({detail:'Ürün Sepete eklenemedi!',summary:'Birşeyler hatalı gitti.',duration:1000});
            return addBasketSuccess();
            }   
        }));
     })
    );
  });

  addOrder$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(addOrder),
      mergeMap((action) =>{
        return this.shopService.addToOrder(action.OrderDetail).pipe(
          map((orderDetail)=>{
            if(orderDetail){
              this.toast.success({detail:'Alışveriş Başarılı !',summary:'Alışverişinizi hesabım sekmesinden kontrol edebilirsiniz.',duration:2000});
              return addOrderSuccess();
            }
            else
            {
              this.toast.warning({detail:'Alışveriş Gerçekleşmedi !',summary:'Birşeyler hatalı gitti!',duration:2000});
              return addOrderSuccess();
            } 
        }));
     })
    );
  });

  getBaskets$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(loadBasket),
      mergeMap(() =>{
        return this.shopService.fetchBasket().pipe(
          map((basketProduct)=>{
            if(basketProduct)
            {
              return loadBasketSuccess({basketProduct});
            }
            else
            {
              this.toast.warning({detail:'Bir hata oluştu !',summary:'Sepetteki ürünler yüklenemedi!',duration:2000});
              return loadBasketFailure({error:'Ürünler yüklenemedi!'});
            }  
        }));
     })
    );
  });

  deleteBasketItem$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(deleteBasketItem),
      mergeMap((action) =>{
        return this.shopService.deleteBasketItem(action.deleteBasketProductId).pipe(
          map(()=>{
            return deleteBasketItemSuccess({message:'Product Deleted!'});  
        }));
     })
    );
  });
  
  getOrder$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(getOrder),
      mergeMap(() =>{
        return this.shopService.fetchOrder().pipe(
          map((orderProduct)=>{
            if(orderProduct){
              this.toast.success({detail:'Alışverişler başarı ile yüklendi !',summary:'Alışverişim bölümünden alışverişlerinizi kontrol edebilirsiniz.',duration:2000});
              return getOrderSuccess({Orders:orderProduct});
            }else{
              this.toast.warning({detail:'Bir hata oluştu !',summary:'irşeyler hatalı gitti..',duration:2000});
              return getOrderFailure({error:'Birşeyler Hatalı gitti.'})
            }
           
              
        }));
     })
    );
  });


}
