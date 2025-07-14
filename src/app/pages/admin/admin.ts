import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { Panel } from '../../components/panel/panel';
import { Tabla } from '../../components/tabla/tabla';
import { Ruta } from '../../components/ruta/ruta';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, Panel, Tabla, Ruta],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})

export class Admin {

  private ui = inject(UiService);
  coleccion = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.ui.getColeccion().subscribe(nombre => {
        this.coleccion.set(nombre);
      });
    });
  }

}
