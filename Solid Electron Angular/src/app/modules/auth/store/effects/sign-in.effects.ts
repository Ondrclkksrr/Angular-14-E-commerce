import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgToastService } from 'ng-angular-popup';
import { switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { loadSignIns, loadSignInsFailure, loadSignInsSuccess } from '../actions/sign-in.actions';



@Injectable()
export class SignInEffects {


  constructor(private actions$: Actions,
              private authService:AuthService,
              private router:Router,
              private afAuth:AngularFireAuth,
              private afs : AngularFirestore,
              private toast:NgToastService) {}
                
  public sıgnIn$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(loadSignIns),
      switchMap(async action=>{
        return this.afAuth.signInWithEmailAndPassword(String(action.email) , String(action.password)).then((result=>{
          if(result.user?.emailVerified===true){
          const authUser: UserModel={
              id: result.user?.uid,
              email:result.user?.email,
              displayName: result.user?.displayName,
              photoUrl:result.user?.photoURL,
              emailVerified:result.user?.emailVerified
          };
          this.authService.userData = authUser;
          localStorage.setItem('user', JSON.stringify(authUser));
          JSON.parse(localStorage.getItem('user')!);
          this.authService.SetUserData(result.user);
          this.router.navigate(['/shop']);
          this.toast.success({detail:'Giriş Başarılı!',summary:'Güvenle alışveriş yapabilirsiniz..',duration:5000});
          return loadSignInsSuccess({data:{user:authUser}});
        }else{
          this.toast.info({detail:'E-postanızı doğrulayınız!',summary:'Giriş yapabilmek için lütfen e-postanızı doğrulayınız.',duration:5000});
          return loadSignInsFailure({error:'Email not verified'});
        }
        }))
        .catch((e)=>{
          this.toast.warning({detail:'Bilgileriniz Hatalı!',summary:'Kullanıcı bilgileri sisteme kayıtlı değil.',duration:5000});
          return loadSignInsFailure({error:'${e}'});
        })
      })
    )   
 })   
}

