import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-filtrar',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-filtrar.html',
  styleUrl: './modal-filtrar.css'
})
export class ModalFiltrar {

  @Input() columnas: string[] = [];
  @Output() aplicarFiltro = new EventEmitter<{ columna: string, palabra: string }>();
  @Output() cancelarFiltro = new EventEmitter<void>();

  columnaSeleccionada = '';
  palabraClave = '';

  ngOnInit() {
    console.log('📌 Columnas recibidas para filtrar:', this.columnas);
  }

  aplicar() {
    if (this.columnaSeleccionada) {
      // Emitimos aunque la palabra clave esté vacía
      this.aplicarFiltro.emit({
        columna: this.columnaSeleccionada,
        palabra: this.palabraClave || ''  // asegura que no sea undefined
      });
    }
  }

  cancelar() {
    this.cancelarFiltro.emit();
  }

}
