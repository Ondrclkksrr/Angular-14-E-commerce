import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { loadSignOuts, loadSignOutsFailure, loadSignOutsSuccess } from '../actions/sign-out.actions';



@Injectable()
export class SignOutEffects {


  constructor(private actions$: Actions,
    private authService:AuthService,
    private router:Router,
) {}
public signOut$= createEffect(()=>{
return this.actions$.pipe(
ofType(loadSignOuts),
mergeMap(async()=>{
return this.authService.signout().then(()=>{
  localStorage.removeItem('user');
  return loadSignOutsSuccess();
})
.catch((e)=>{
  return loadSignOutsFailure({error:'${e}'});
});
})

);
});
private signOutSuccess$ =createEffect(()=>{
return this.actions$.pipe(
ofType(loadSignOutsSuccess),
tap(()=>{
  this.router.navigate(['/login'])})
);
},
{
dispatch:false,
}
);
}
