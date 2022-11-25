import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, State } from "../reducer/auth.reducer";
const authFeatureSelector=createFeatureSelector<State>(authFeatureKey);
export const getUser = createSelector(
  authFeatureSelector,
  (state)=>state.user
  );
  export const getAuthLoading = createSelector(
    authFeatureSelector,
    (state)=>state.loading
    );
    export const getAuthError = createSelector(
      authFeatureSelector,
      (state)=>state.error
      );  