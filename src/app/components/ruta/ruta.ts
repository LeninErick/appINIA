import { Component, effect, inject } from '@angular/core';
import { UiService } from '../../services/ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta',
  imports: [CommonModule],
  templateUrl: './ruta.html',
  styleUrl: './ruta.css'
})
export class Ruta {

  private ui = inject(UiService);

  titulo: string = '';
  breadcrumb: string[] = [];

  constructor() {
    this.ui.getRuta().subscribe((ruta) => {
      if (ruta.length > 0) {
        this.breadcrumb = [...ruta];
        this.titulo = ruta[ruta.length - 1] ?? '';
      } else {
        this.breadcrumb = [];
        this.titulo = '';
      }
    });
  }

}
