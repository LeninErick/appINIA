import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { ROL_ACCESOS } from '../../utils/roles';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-panel',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {

  public authService = inject(AuthService);
  //private router = inject(Router);
  private ui = inject(UiService);

  logout() {
    this.authService.logout();
  }

  accesosPorRol(rol: string): string[] {
    return ROL_ACCESOS[rol] || [];
  }

  irA(nombre: string) {
    
    this.ui.setColeccion(nombre);
    this.ui.setRuta([nombre]);      // Activa la ruta breadcrumb
    
    /*
    const ruta = `/${this.authService.currentUser$.value?.rolUsua.toLowerCase()}/${nombre.toLowerCase()}`;
    this.router.navigate([ruta]);
    */

  }

}
