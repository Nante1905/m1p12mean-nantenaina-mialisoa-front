import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { RoleType } from '../../types/Auth';

/**
 *
 * @param roles
 * @returns boolean
 *
 * Prevent access to a route if the user does not have at least one of the required role.
 */
export const roleGuard =
  (roles: RoleType[]): CanActivateFn =>
  (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const redirect = route.url;

    const activate = authService.hasRole(roles);
    if (!activate) {
      router.navigateByUrl('/');
      return activate;
    }
    return activate;
  };
