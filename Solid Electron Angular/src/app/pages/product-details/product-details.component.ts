import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasketModel } from 'src/app/models/basket.model';
import { ProductModel } from 'src/app/models/product.model';
import { ShopService } from '../shop.service';
import { addBasket } from '../state/shop.actions';
import { ShopState } from '../state/shop.reducer';
import { getProducts } from '../state/shop.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public allProducts$ :Observable<ProductModel[]>;
  public productId;
  public products$ :ProductModel[]= [];
  user: any;
  constructor(private store : Store<ShopState>,private activatedRoute:ActivatedRoute,private shopService:ShopService)
  { 

  }
  ngOnInit(): void 
  {
    // localden kullanıcı alma , shop verileri için aksiyon dispathleme ve verileri observ şeklinde alma, linki kırıp ürün ıd yi elde etme
    this.user = JSON.parse(localStorage.getItem('user'));
    this.allProducts$   =this.store.pipe(select(getProducts));
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.fetchProducts().subscribe({
      next: products =>{
        this.products$=products;
      }
    })
    }
    //detay sayfasındaki mevcur ürünü basketa ekleme
  addBasket(uid:string,productId:string,name:string,desc:string,price:number,photoUrl:string,quantity:number){
    var basketProduct : BasketModel[] =[];
    basketProduct.push({uid:this.user.id, productid:productId,productname:name,desc:desc,price:price,photoUrl:photoUrl,quantity:quantity});
    this.store.dispatch(addBasket({basketProduct}))
  }
}
  


