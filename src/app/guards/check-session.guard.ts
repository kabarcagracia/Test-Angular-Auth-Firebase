import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CheckSessionGuard implements CanActivate {
  
  constructor(
    private authservice: AuthService,
    private router: Router
  ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean | UrlTree> {
    let userData = this.authservice.isLoggedIn;
    
    if(userData == null) {
        this.router.navigate(['login']);
    }
    //console.log("aqui podemos hacer una verificacion mas dificil", userData);
    return true;
  }
}
