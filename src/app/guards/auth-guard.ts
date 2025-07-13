import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(Auth);     // instancia de Firebase Auth
  const router = inject(Router);   // para redireccionar

  return authState(auth).pipe(     // observable con el usuario o null
    take(1),                       // completamos tras el primer valor
    map(user =>
      user ? true                  // si hay sesión → deja pasar
           : router.parseUrl('/login') // si no → redirige a /login
    )
  );

  

};