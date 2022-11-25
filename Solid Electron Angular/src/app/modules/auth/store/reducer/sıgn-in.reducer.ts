import {  Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import { loadSignIns, loadSignInsFailure, loadSignInsSuccess } from '../actions/sign-in.actions';


export const sıgnInFeatureKey = 'sıgnIn';

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
  on(loadSignIns,(state)=> ({...state,loading:true})),
  on(loadSignInsSuccess,(state,action)=> ({...state,loading:true,user:action.data.user})),
  on(loadSignInsFailure,(state,action)=> ({...state,loading:false,error:action.error})),
  

);
