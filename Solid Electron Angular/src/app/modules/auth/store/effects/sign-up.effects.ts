import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgToastService } from 'ng-angular-popup';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { loadSignups, loadSignupsFailure, loadSignupsSuccess } from '../actions/signup.actions';



@Injectable()
export class SignUpEffects {


  constructor(private actions$: Actions,
    private authService:AuthService,
    private afAuth:AngularFireAuth,
    private toast:NgToastService) {}

public sıgnUp$= createEffect(()=>{
return this.actions$.pipe(
ofType(loadSignups),
switchMap(async action=>{
return this.afAuth.createUserWithEmailAndPassword(String(action.email) , String(action.password)).then((result=>{
if(result){
this.authService.SendVerificationMail();
this.authService.signout();
this.toast.success({detail:'Kayıt Başarılı !',summary:'Başarıyla kayıt oldunuz.',duration:5000});
return loadSignupsSuccess();
}else{
return loadSignupsFailure({error:'Cancelled By User'});
}
}))
.catch((e)=>{
return loadSignupsFailure({error:'${e}'});
})
})
)   
})   
}
