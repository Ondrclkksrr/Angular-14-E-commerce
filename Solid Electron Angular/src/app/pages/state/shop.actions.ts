import { createAction, props } from '@ngrx/store';
import { BasketModel } from 'src/app/models/basket.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';

//tüm shop aksiyonlarımız

export const loadShops = createAction(
  '[Shop] Load Shops'
);

export const loadShopsSuccess = createAction(
  '[Shop] Load Shops Success',
  props<{ products: ProductModel[]}>()
);

export const loadShopsFailure = createAction(
  '[Shop] Load Shops Failure',
  props<{ error: string }>()
);

export const addBasket = createAction(
  '[Shop] Add Baskets',
  props<{ basketProduct: BasketModel[]}>()
);

export const addBasketSuccess = createAction(
  '[Shop] Add Basket Success',
  
);

export const addBasketFailure = createAction(
  '[Shop] Add Basket Failure',
  props<{ error: string }>()
);

export const loadBasket = createAction(
  '[Shop] Load Baskets'
);

export const loadBasketSuccess = createAction(
  '[Shop] Load Basket Success',
  props<{ basketProduct: BasketModel[]}>()
);

export const loadBasketFailure = createAction(
  '[Shop] Load Basket Failure',
  props<{ error: string }>()
);
export const deleteBasketItem = createAction(
  '[Shop] Load Delete Basket Item',
  props<{ deleteBasketProductId: string}>()
);

export const deleteBasketItemSuccess = createAction(
  '[Shop] Load Delete Basket Item Success',
  props<{ message: string }>()
 
);

export const deleteBasketItemFailure = createAction(
  '[Shop] Load Delete Basket Item Failure',
  props<{ error: string }>()
);

export const addOrder = createAction(
  '[Shop] Add Orders',
  props<{ OrderDetail: OrderModel[]}>()
);

export const addOrderSuccess = createAction(
  '[Shop] Add Orders Success',
  
);

export const addOrderFailure = createAction(
  '[Shop] Add Orders Failure',
  props<{ error: string }>()
);

export const getOrder = createAction(
  '[Shop] Get Orders'
  
);

export const getOrderSuccess = createAction(
  '[Shop] Get Orders Success',
  props<{ Orders: OrderModel[]}>()
);

export const getOrderFailure = createAction(
  '[Shop] Get Orders Failure',
  props<{ error: string }>()
);