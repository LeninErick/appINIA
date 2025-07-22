import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { Panel } from '../../components/panel/panel';
import { Tabla } from '../../components/tabla/tabla';
import { Ruta } from '../../components/ruta/ruta';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-consultor',
  imports: [CommonModule, Panel, Tabla, Ruta],
  templateUrl: './consultor.html',
  styleUrl: './consultor.css'
})

export class Consultor {

  private ui = inject(UiService);
  coleccion = signal<string | null>(null);
  public uiPublic = inject(UiService);

  constructor() {
    effect(() => {
      this.ui.getColeccion().subscribe(nombre => {
        this.coleccion.set(nombre);
      });
    });
  }

}
