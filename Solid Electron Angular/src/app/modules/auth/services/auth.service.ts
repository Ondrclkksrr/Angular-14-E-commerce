import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app'
import {Observable} from 'rxjs'
import{AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  userData: any;
  constructor(private auth:AngularFireAuth,private afs:AngularFirestore, private router:Router,private toast:NgToastService) 
  { 
    
  }
  checkAuth():Observable<firebase.User | null>
  {
    return this.auth.authState;
  }

  //google girişi
  async signInWithGoogle(): Promise<firebase.User|null>
  {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithRedirect(provider);
    const res = await this.auth.getRedirectResult();
    return (await this.auth.getRedirectResult()).user;
  }
  // çıkış
  async signout(): Promise<void>
  {
    await this.auth.signOut();
  }
  //kullanıcı verileri local storage 
  SetUserData(user: any) 
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `users/${user.uid}`
    );
    const userData: UserModel = {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
    merge: true,
    });
  }  
  // dogrulama maili gönderme
  SendVerificationMail() {
      return this.auth.currentUser.then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['/verify-email']);
        });
  } 
  // şifre hatırlatma
  ForgotPassword(passwordResetEmail: string) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          this.toast.success({detail:'Sıfırlama maili Gönderildi!',summary:'E-postanızı kontrol ediniz!.',duration:1000});
        })
        .catch((error) => {
          this.toast.error({detail:'Hata! ',summary:'Bu e-posta ile kayıtlı kullanıcı Bulunamadı! Lütfen bilgilerinizi kontrol ediniz.',duration:5000});
        });
  }
   // isLoggedIn get --> Bu dönen bool parametre email login guard tarafında kontrol ediliyor.
  get isLoggedIn(): boolean 
  {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.emailVerified !== false) ? true : false;
  }
}
