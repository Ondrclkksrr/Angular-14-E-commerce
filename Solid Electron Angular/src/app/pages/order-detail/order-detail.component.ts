import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/models/order.model';
import { ShopService } from '../shop.service';
import { ShopState } from '../state/shop.reducer';
import { getOrders$ } from '../state/shop.selectors';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public allOrders$ :Observable<OrderModel[]>;
  public orderId;
  public order$ :OrderModel[]= [];
  user: any;
  constructor(private store : Store<ShopState>,private activatedRoute:ActivatedRoute,private shopService:ShopService) 
  { 
    
  }
  ngOnInit(): void 
  {
    //Gerekli filtrelemeleri kullanııya göre yapmak için kullanıcıyı çekiyoruz.
    this.user = JSON.parse(localStorage.getItem('user'));
    //orderlerın gelmesi için orderları selector ile observ yapısında alıyoruz.
    this.allOrders$   =this.store.pipe(select(getOrders$));
    //url ile göndeirlen ürün ıd yi urlyi mapleyerek elde ediyoruz.
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    //selector ile aldığımız bütün orderları bir ordermodelden türeyen bir diziye eşitliyoruz.
    this.shopService.fetchOrder().subscribe({
      next: orders =>{
      this.order$ = orders
      }
    })
  }
}
