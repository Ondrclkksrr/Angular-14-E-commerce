import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgToastService } from 'ng-angular-popup';
import { mergeMap, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { loadCheckAuthsSuccess } from '../actions/check-auth.actions';
import { loadSignInWithGoogles, loadSignInWithGooglesFailure, loadSignInWithGooglesSuccess } from '../actions/sign-in-with-google.actions';



@Injectable()
export class SignInWithGoogleEffects {


  constructor(private actions$: Actions,
              private authService:AuthService,
              private router:Router,
              private toast:NgToastService
    ) {}
    public sıgnInWithGoogle$= createEffect(()=>{
      return this.actions$.pipe(
        ofType(loadSignInWithGoogles),
        mergeMap(async()=>{
          return this.authService.signInWithGoogle().then((user=>{
            if(user!==null){
            const authUser: UserModel={
              id: user.uid,
              email:user.email,     
              displayName: user.displayName,
              photoUrl:user.photoURL,
              emailVerified:user.emailVerified
            };
            this.authService.userData = authUser;
            localStorage.setItem('user', JSON.stringify(authUser));
            JSON.parse(localStorage.getItem('user')!);
            this.toast.success({detail:'Giriş Başarılı!',summary:'Güvenle alışveriş yapabilirsiniz..',duration:5000});
            return loadCheckAuthsSuccess({data:{user:authUser}});
          }else{
            return loadSignInWithGooglesFailure({error:'Cancelled By User'});
          }
          }))
          .catch((e)=>{
            this.toast.warning({detail:'Hata !',summary:e,duration:5000});
            return loadSignInWithGooglesFailure({error:'${e}'});
          })
        })

      );
    });
      private signInWithGooglesSuccess$ =createEffect(()=>{
        return this.actions$.pipe(
          ofType(loadSignInWithGooglesSuccess),
          tap(()=>this.router.navigate(['/shop']))
        );
      },
      {
        dispatch:false,
      }
      );
  
}
