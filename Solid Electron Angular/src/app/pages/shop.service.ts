import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasketModel } from '../models/basket.model';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient){
  }

  // service dosyamızda http client ile tüm http get,post,delete işlemlerini yapıyoruz..(sepete ekleme,çekme,ürünleri getirme,sepet ürünü silme vs.)
  addToBasket(product: BasketModel[])
  {
    return  this.http.post('https://solidelectron-7be33-default-rtdb.firebaseio.com/basket.json',product[0]); 
  }

  // quantity logicini oluşturmaya çalıştım fakat zamanım yetmedi.
  /*addToQuantity(quantity:number,productid:string)
  {
    return this.http.patch<BasketModel[]>('https://solidelectron-7be33-default-rtdb.firebaseio.com/basket/'+productid+'.json',{quantity:quantity});
  }*/

  addToOrder(order: OrderModel[])
  {
    return this.http.post('https://solidelectron-7be33-default-rtdb.firebaseio.com/order.json',order[0]); 
  }

  fetchProducts(): Observable<ProductModel[]>
  {
    return this.http.get<ProductModel[]>('https://solidelectron-7be33-default-rtdb.firebaseio.com/products.json')
     .pipe(
     map((data)=>{
       const product : ProductModel[] = [];
       for(let key in data){
          product.push({...data[key], id:key}); 
       }
       return product;
     })
    );     
  }

 fetchBasket(): Observable<BasketModel[]>{
  return this.http
  .get<BasketModel[]>('https://solidelectron-7be33-default-rtdb.firebaseio.com/basket.json')
   .pipe(
   map((data)=>{
     const product : BasketModel[] = [];
     for(let key in data){
       product.push({...data[key], productid:key});
     }
     return product;
   })
  );   
 }

 fetchOrder(): Observable<OrderModel[]>
 {
   return this.http.get<OrderModel[]>('https://solidelectron-7be33-default-rtdb.firebaseio.com/order.json')
   .pipe(
   map((data)=>{
     const order : OrderModel[] = [];
     for(let key in data){
       order.push({...data[key], orderid:key});
     }
     return order;
   })
  );   
 }

 deleteBasketItem(deleteBasketItemId:string)
 {
    return this.http.delete('https://solidelectron-7be33-default-rtdb.firebaseio.com/basket/'+deleteBasketItemId+'.json');
 }
}
