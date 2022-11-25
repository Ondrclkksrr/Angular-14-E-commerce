import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

export const loadSignIns = createAction(
  '[SignIn] Load SignIns',
  props<{ email: string , password:string }>()
);

export const loadSignInsSuccess = createAction(
  '[SignIn] Load SignIns Success',
  props<{ data: {
    user:UserModel;
          }

  }>()
);

export const loadSignInsFailure = createAction(
  '[SignIn] Load SignIns Failure',
  props<{ error: string }>()
);
