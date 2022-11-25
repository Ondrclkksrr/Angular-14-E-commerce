import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

export const loadCheckSignIns = createAction(
  '[CheckSignIn] Load CheckSignIns'
);

export const loadCheckSignInsSuccess = createAction(
  '[CheckSignIn] Load CheckSignIns Success',
  props<{ data: {
    user:UserModel;
          }

  }>()
);

export const loadCheckSignInsFailure = createAction(
  '[CheckSignIn] Load CheckSignIns Failure',
  props<{ error: string }>()
);
