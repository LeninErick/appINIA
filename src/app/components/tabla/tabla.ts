import { Component, effect, inject, Input, signal } from '@angular/core';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-tabla',
  imports: [],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})

export class Tabla {

  @Input() coleccion: string | null = null;

  private ui = inject(UiService);
  coleccionActiva = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.ui.getColeccion().subscribe(nombre => {
        this.coleccionActiva.set(nombre);
        console.log('📊 Colección activa actualizada:', nombre);
        // Aquí podrías cargar datos, cambiar columnas, etc.
      });
    });
  }

}
