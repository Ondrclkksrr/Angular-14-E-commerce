import { Component, EventEmitter, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, pipe, Subscription } from 'rxjs';
import { BasketModel } from 'src/app/models/basket.model';
import { ProductModel } from '../../models/product.model'
import { addBasket, loadBasket, loadShops } from '../state/shop.actions';
import { ShopState } from '../state/shop.reducer';
import { getBaskets$, getProducts } from '../state/shop.selectors';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public allProducts$ :Observable<ProductModel[]>;
  public allBasketProducts$ :Observable<BasketModel[]>;
  user:any;
  sub : Subscription;
  filterText:string ='';
  categoryText:string='';
  oldBasketProducts:BasketModel[]=[];
  filterCategoryChanged:EventEmitter<string> = new EventEmitter<string>();
  constructor(private store :Store<ShopState>) {}
  //shopu yüklemek için aksiyon fırlatma,ürünleri selector ile getirme ve userı local storagedan alma
  ngOnInit(): void {
  this.store.dispatch(loadShops());
  this.store.dispatch(loadBasket());
  this.allProducts$= this.store.pipe(select(getProducts));
  this.allBasketProducts$= this.store.pipe(select(getBaskets$));
  this.user = JSON.parse(localStorage.getItem('user'));
  this.sub= this.allBasketProducts$.subscribe(pipe((data:BasketModel[])=>
  {
    this.oldBasketProducts=data;
  }))
  }
  onCategorySelected()
  {
    this.filterCategoryChanged.emit(this.categoryText);
  }

  // gelen bilgileri bir basketmodelden türeyen bir diziye atıp aksiyonla beraber fırlatıyoruz.
  addBasket(uid:string,productId:string,name:string,desc:string,price:number,photoUrl:string,quantity:number)
  {
    var basketProduct : BasketModel[] =[];
    basketProduct.push({uid:this.user.id, productid:productId,productname:name,desc:desc,price:price,photoUrl:photoUrl,quantity:quantity});
    this.store.dispatch(addBasket({basketProduct}))
  }
}

