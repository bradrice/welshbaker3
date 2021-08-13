import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { NgAuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 
  constructor(private _router:Router, public authService: NgAuthService ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

      //check some condition  
      if (!this.authService.isLoggedIn) {
        console.log(this.authService.isLoggedIn );
        alert('You are not allowed to view this page. You are redirected to login Page');
        
        this._router.navigate(["login"],{ queryParams: { retUrl: route.url} });
        return false;

        //var urlTree = this.router.createUrlTree(['login']);
        //return urlTree;
    } 
      return true;
  }

}
