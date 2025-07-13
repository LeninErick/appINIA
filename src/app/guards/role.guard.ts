import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
Router

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.userData$.pipe(               // observable con los datos completos del usuario
      map(userData => {
        if (userData && allowedRoles.includes(userData.rolUsua)) {
          return true;                        // ✅  rol autorizado
        }
        router.navigate(['/']);               // 🚫  rol NO autorizado
        return false;
      })
    );
  };
}