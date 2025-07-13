import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';

export const roleGuard: CanActivateFn = (route, _state) => {
  const auth      = inject(Auth);
  const firestore = inject(Firestore);
  const router    = inject(Router);

  const rolesPermitidos = route.data['roles'] as string[] | undefined;
  if (!rolesPermitidos || rolesPermitidos.length === 0) {
    return of(true);            // ✅ ahora se devuelve Observable<boolean>
  }

  return authState(auth).pipe(
    take(1),
    switchMap(user => {
      if (!user) return of(router.parseUrl('/login'));
      const userDoc = doc(firestore, `USUARIO/${user.uid}`);
      return docData(userDoc).pipe(
        take(1),
        map((data: any) => {
          const rol = data?.rolUsua;
          return rolesPermitidos.includes(rol)
            ? true
            : router.parseUrl('/error404');   // puedes cambiar a /404 si prefieres
        })
      );
    })
  );
};