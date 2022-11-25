import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {map,tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SıgnedOutGuard implements CanActivate {
  constructor(private router:Router, private authService:AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.checkAuth().pipe(map(user=>{
        if(user !== null){
          return true;
        }
        else{
          return false;
        }
      }),
      tap((res)=>{
        if(res){
          return route;
        }
        else{
          return this.router.navigate(['shop']);
        }
      })
      );
    }
  
}
