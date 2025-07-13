import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  clave = '';
  error = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    this.error = '';
    try {
      await this.authService.login(this.correo, this.clave);
    } catch (err: any) {
      this.error = 'Correo o contraseña incorrectos.';
    }
  }
}
