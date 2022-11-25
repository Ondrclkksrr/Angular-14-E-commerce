import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailLoginGuardGuard implements CanActivate
{
  constructor(public authService: AuthService,public router: Router)
  {

  }
  // email login kontrolü için servis dosyasındaki değişkeni kontrol edip route yapan can activate
  canActivate():Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
      if(this.authService.isLoggedIn !== true) {
        this.router.navigate(['login'])
      }
      return true;
  }
}
