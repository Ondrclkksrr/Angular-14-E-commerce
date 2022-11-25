import { createAction, props } from '@ngrx/store';

export const loadSignOuts = createAction(
  '[SignOut] Load SignOuts'
);

export const loadSignOutsSuccess = createAction(
  '[SignOut] Load SignOuts Success',

);

export const loadSignOutsFailure = createAction(
  '[SignOut] Load SignOuts Failure',
  props<{ error: string }>()
);
