import { createAction, props } from '@ngrx/store';


export const loadSignups = createAction(
  '[Signup] Load Signups',
  props<{ email: string,password:string }>()
);

export const loadSignupsSuccess = createAction(
  '[Signup] Load Signups Success',
);

export const loadSignupsFailure = createAction(
  '[Signup] Load Signups Failure',
  props<{ error: string }>()
);
