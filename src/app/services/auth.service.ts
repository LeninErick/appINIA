import { Injectable, inject } from '@angular/core';
import { Auth, User, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // Observable del usuario Firebase (email, uid, etc.)
  user$: Observable<User | null> = authState(this.auth);

  // Observable con datos de la colección USUARIO
  userData$ = new BehaviorSubject<any>(null);

  constructor() {
    // Escucha cambios en sesión y carga los datos desde Firestore
    this.user$.pipe(
      switchMap(user => {
        if (!user) {
          this.userData$.next(null);
          return of(null);
        }

        const userRef = doc(this.firestore, `USUARIO/${user.uid}`);
        return docData(userRef);
      })
    ).subscribe(userData => this.userData$.next(userData));
  }

  /**
   * Iniciar sesión con email y contraseña
   */
  async login(correo: string, clave: string) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, correo, clave);
      const uid = cred.user.uid;

      // Espera a que el observable actualice los datos y redirige por rol
      const sub = this.userData$.subscribe(user => {
        if (user && user.rolUsua) {
          this.router.navigate(['/' + user.rolUsua]);
          sub.unsubscribe();
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    await signOut(this.auth);
    this.userData$.next(null);
    this.router.navigate(['/login']);
  }

}
