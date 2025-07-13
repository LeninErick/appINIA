import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signInWithEmailAndPassword, Auth, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('appinia');
  
  
  private auth = inject(Auth);

  constructor() {
    //signOut(this.auth).then(() => console.log('✅ Sesión cerrada'));
    
    
    signInWithEmailAndPassword(this.auth, '123@gmail.com', 'admin1')
      .then((userCredential) => {
        console.log('✅ Usuario autenticado:', userCredential.user);
      })
      .catch((error) => {
        console.error('❌ Error al autenticar:', error);
      });
      
  }
  

}
