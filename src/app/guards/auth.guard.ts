import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';


export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    map(user => {
      if (user) {
        return true;                     // ✅  usuario autenticado
      }
      router.navigate(['/login']);       // 🚫  sin sesión → login
      return false;
    })
  );
};
