import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const currentUser = localStorage.getItem('authToken');
      // if (currentUser) {
      //   return true;
      // }
  
      // // not logged in so redirect to login page with the return url
      // this.authService.logout();
      // return false;
      const token = localStorage.getItem('authToken');
      if (state.url.includes('login')) {
        if (!token) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        if (token) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  
  

