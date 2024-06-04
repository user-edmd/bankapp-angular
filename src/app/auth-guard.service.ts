import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
) => {
  const router: Router = inject(Router);
  const authService: AuthenticationService = inject(AuthenticationService);

  if (authService.isUserAdmin()) {
    router.navigate(['/users'])
    return true;
  }
  else if (authService.isUserRegistered()) {
    return true;
  }
  else {
    router.navigate(['/unauthorized'])
    return false;
  }
}