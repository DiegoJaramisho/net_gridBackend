import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private userService: UsersService, private router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      if (token) {
        this.userService.validarToken(token).subscribe({
          next: res => {
            console.log(res);
          },
          error: (err) => {
            localStorage.clear()
            this.router.navigate(['/login'])
          }
        })
        return true
      }
      return false;
    } catch (error) {
      return false
    }
  }

}
