import { } from '../../modules/auth/services/auth.service';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shopFeatureKey, ShopState } from './shop.reducer';
const shopFeatureSelector=createFeatureSelector<ShopState>(shopFeatureKey);
//verileri çekmek için oluşturulmuş selectorlar
export const getProducts = createSelector(
    shopFeatureSelector,
  (state)=>state.product
  );
  export const getBaskets$ = createSelector(
    shopFeatureSelector,
  (state)=>state.basket
  );
  export const getOrders$ = createSelector(
    shopFeatureSelector,
  (state)=>state.order
  );

