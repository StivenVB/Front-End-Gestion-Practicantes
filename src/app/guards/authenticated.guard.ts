import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard {
  
  constructor(private service: SecurityService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("From authenticated guard... ");

    if (!this.service.sessionExists()) {
      console.log(this.service.sessionExists())
      this.router.navigate(["/home"]);
      return false;
    } else {
      return true;
    }

  }
  
}
