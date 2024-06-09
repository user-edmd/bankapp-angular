import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthenticationService = inject(AuthenticationService);

  if (authService.isUserAdmin()) {
    return true;
  }
  router.navigate(['/unauthorized'])
  return false;
};
