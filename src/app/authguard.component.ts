import { Injectable } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.currentUser.id != null) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
