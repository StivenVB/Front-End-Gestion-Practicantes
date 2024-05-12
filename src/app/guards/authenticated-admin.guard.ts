import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { ServiceConfig } from '../config/service.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedAdminGuard implements CanActivate {
  
  constructor(private service: SecurityService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("From authenticated admin guard... ");
    if (this.service.sessionExists() && this.service.isUserRol(ServiceConfig.adminUserRol)) {
      return true;
    } else {
      this.router.navigate(["/security/login"]);
      return false;
    }

  }
  
}
