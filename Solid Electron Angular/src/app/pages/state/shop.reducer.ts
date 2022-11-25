import { Action, createReducer, on, } from '@ngrx/store';
import { BasketModel } from 'src/app/models/basket.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import {addBasket, addOrder, addOrderFailure, addOrderSuccess,  deleteBasketItem, getOrder, getOrderFailure, getOrderSuccess, loadBasket, loadBasketFailure, loadBasketSuccess, loadShops, loadShopsFailure, loadShopsSuccess } from './shop.actions';


export const shopFeatureKey = 'shop';

export interface ShopState {
  product?:ProductModel[]|null;
  basket?:BasketModel[]|null;
  loading?:boolean;
  error?:string|null;
  order:OrderModel[];

}

export const initialState: ShopState = {
  product:null,
  basket:null,
  loading:false,
  error:null,
  order:null
};

export const reducer = createReducer<ShopState,Action>(
  initialState,
  // shop reducers
  on(loadShops,(state)=> ({...state,loading:true})),
  on(loadShopsSuccess,(state,action)=>({...state,loading:false,product:action.products})),
  on(loadShopsFailure,(state,action)=>({...state,loading:false,error:action.error})),
  // fetch basket reducers
  on(loadBasket,(state)=> ({...state,loading:true})),
  on(loadBasketSuccess,(state,action)=>({...state,loading:false,basket:action.basketProduct})),
  on(loadBasketFailure,(state,action)=>({...state,loading:false,error:action.error})),
  // delete basket item reducers
  on(deleteBasketItem,(state,action)=>({...state,loading:false,basket:state.basket.filter(item => action.deleteBasketProductId !== item.productid)})),
  // add  basket reducers
  on(addBasket,(state,action)=>({...state,loading:false,basket:action.basketProduct})),
  // add order reducers
  on(addOrder,(state,action)=>({...state,loading:false,Order:action.OrderDetail})),
  on(addOrderSuccess,(state)=>({...state,loading:false})),
  on(addOrderFailure,(state,action)=>({...state,loading:false,error:action.error})),
  // get order reducers
  on(getOrder,(state)=>({...state,loading:false})),
  on(getOrderSuccess,(state,action)=>({...state,loading:false,order:action.Orders})),
  on(getOrderFailure,(state,action)=>({...state,loading:false,error:action.error})),


);
