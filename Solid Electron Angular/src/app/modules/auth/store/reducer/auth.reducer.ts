
import { Actions } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import { loadCheckAuths, loadCheckAuthsFailure, loadCheckAuthsSuccess } from '../actions/check-auth.actions';
import { loadSignInWithGoogles, loadSignInWithGooglesFailure, loadSignInWithGooglesSuccess } from '../actions/sign-in-with-google.actions';
import { loadSignOuts, loadSignOutsFailure, loadSignOutsSuccess } from '../actions/sign-out.actions';


export const authFeatureKey = 'auth';

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
  on(loadCheckAuths,(state)=> ({...state,loading:true})),
  on(loadCheckAuthsSuccess,(state,action)=>({...state,loading:false,user:action.data.user,})),
  on(loadCheckAuthsFailure,(state,action)=>({...state,loading:false,error:action.error})),
  on(loadSignInWithGoogles,(state)=>({...state,loading:true})),
  on(loadSignInWithGooglesSuccess,(state,action)=>({...state,loading:false,user:action.data.user})),
  on(loadSignInWithGooglesFailure,(state,action)=>({...state , loading:false, error:action.error})),
  on(loadSignOuts,(state)=>({...state,loading:true})),
  on(loadSignOutsSuccess,(state)=>({...state,loading:false,user:null})),
  on(loadSignOutsFailure,(state,action)=>({...state,loading:false,error:action.error}))


);
