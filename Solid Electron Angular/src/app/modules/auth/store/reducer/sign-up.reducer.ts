import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import { loadSignups, loadSignupsFailure, loadSignupsSuccess } from '../actions/signup.actions';


export const signUpFeatureKey = 'signUp';

export interface State {
  user:UserModel|null;
  loading:boolean;
  error:string|null;
}

export const initialState: State = {
  user:null,
  loading:false,
  error:null,
};

export const reducer = createReducer<State,Action>(
  initialState,
  on(loadSignups,(state)=> ({...state,loading:true})),
  on(loadSignupsSuccess,(state,action)=> ({...state,loading:true})),
  on(loadSignupsFailure,(state,action)=> ({...state,loading:false,error:action.error})),

  

);