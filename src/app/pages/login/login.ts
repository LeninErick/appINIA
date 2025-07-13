import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb     = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  /** Formulario reactivo con validaciones */
  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /** Controla si se intentó enviar para mostrar errores */
  submitted = false;

  /** Acción de envío */
  
  async onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    try {
      await this.authService.login(email!, password!);
      this.router.navigate(['/']); // redirección provisional
    } catch (error: any) {
      console.error('❌ Error de login:', error);
      this.form.setErrors({ auth: error.message });
    }
  }

}
