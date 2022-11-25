import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgToastService } from 'ng-angular-popup';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { loadCheckAuths, loadCheckAuthsFailure, loadCheckAuthsSuccess } from '../actions/check-auth.actions';



@Injectable()
export class CheckAuthEffects {
  constructor(private actions$: Actions,
              private authService:AuthService,
              private router:Router,
              private toast :NgToastService) 
              {}

  public checkAuth$ = createEffect(()=>{
  return this.actions$.pipe(
    ofType(loadCheckAuths),
    mergeMap(()=> {
      return this.authService.checkAuth().pipe(
        map((user)=>{
          if(user!==null){
            const authUser: UserModel={
              id: user.uid,
              email:user.email,
              displayName:user.displayName,
              photoUrl:user.photoURL,
              emailVerified:user.emailVerified
            };
            this.authService.userData = authUser;
            localStorage.setItem('user', JSON.stringify(authUser));
            JSON.parse(localStorage.getItem('user')!);
            return loadCheckAuthsSuccess({data:{user:authUser}});
          }else {
            this.toast.info({detail:'Bilgi !',summary:'Alışveriş yapabilmek için lütfen giriş yapınız.',duration:5000});
            return loadCheckAuthsFailure({error:'Cancelled By User'});
          }
        }),
        catchError((e)=>of(loadCheckAuthsFailure({error:'${e}'})))
        
      );
    })
  );
});
private checkAuthScuccess$ = createEffect(
  ()=>{
    return this.actions$.pipe(
      ofType(loadCheckAuthsSuccess),
      tap(()=>{
        this.router.navigate(['/shop']);
      })
    );
  },
  {dispatch:false}
);
}
