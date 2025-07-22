import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { Panel } from '../../components/panel/panel';
import { Tabla } from '../../components/tabla/tabla';
import { Ruta } from '../../components/ruta/ruta';
import { UiService } from '../../services/ui';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-tecnico',
  imports: [CommonModule, Panel, Tabla, Ruta],
  templateUrl: './tecnico.html',
  styleUrl: './tecnico.css'
})

export class Tecnico {

  private ui = inject(UiService);
  coleccion = signal<string | null>(null);
  private firestoreService = inject(FirestoreService); // ⬅️ aquí
  public uiPublic = inject(UiService);

  constructor() {
    effect(() => {
      this.ui.getColeccion().subscribe(nombre => {
        this.coleccion.set(nombre);
      });
    });
  }

}
