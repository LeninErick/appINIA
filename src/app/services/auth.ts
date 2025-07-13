import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { USUARIO } from '../models/usuario';

export type Usuario = USUARIO;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // Estado reactivo del usuario autenticado
  currentUser$ = new BehaviorSubject<Usuario | null>(null);

  /** Iniciar sesión y redirigir según el rol */
  async login(email: string, password: string): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = credential.user;

      // Obtener datos adicionales del usuario desde Firestore
      const docRef = doc(this.firestore, 'USUARIO', user.uid);
      const snap = await getDoc(docRef);

      if (!snap.exists()) throw new Error('Usuario no registrado en la base de datos');

      const data = snap.data() as Usuario;
      const usuario: Usuario = { id: user.uid, ...data };

      // Guardar en el estado
      this.currentUser$.next(usuario);

      // Redirigir según el rol
      switch (usuario.rolUsua.toLowerCase()) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'tecnico':
          this.router.navigate(['/tecnico']);
          break;
        case 'consultor':
          this.router.navigate(['/consultor']);
          break;
        case 'vendedor':
          this.router.navigate(['/vendedor']);
          break;
        default:
          throw new Error('Rol no válido o no reconocido');
      }
    } catch (err: any) {
      console.error('🔥 Error al iniciar sesión:', err);
      throw new Error(err.message || 'Error desconocido');
    }
  }

  logout() {
    this.currentUser$.next(null);
    return signOut(this.auth);
  }

  /** Obtener usuario actual como observable */
  getCurrentUser() {
    return this.currentUser$.asObservable();
  }
  
}
