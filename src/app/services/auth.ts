import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private auth = inject(Auth);

  /** Iniciar sesión con correo y contraseña */
  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err: any) {
      // Manejamos errores comunes de Firebase
      const code = err.code;
      let message = 'Ocurrió un error inesperado.';

      switch (code) {
        case 'auth/user-not-found':
          message = 'El usuario no está registrado.';
          break;
        case 'auth/wrong-password':
          message = 'La contraseña es incorrecta.';
          break;
        case 'auth/invalid-email':
          message = 'El correo ingresado no es válido.';
          break;
        case 'auth/too-many-requests':
          message = 'Demasiados intentos. Intenta más tarde.';
          break;
      }

      throw new Error(message);
    }
  }

  /** Cerrar sesión */
  logout() {
    return signOut(this.auth);
  }
  
}
