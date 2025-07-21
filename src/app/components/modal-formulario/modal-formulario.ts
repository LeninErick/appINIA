import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../services/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal';
import { take } from 'rxjs';
import { UiService } from '../../services/ui';
import { MODAL_CONFIGURACIONES } from '../../models/modal-configuraciones';


@Component({
  selector: 'app-modal-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-formulario.html',
  styleUrl: './modal-formulario.css'
})
export class ModalFormulario {

  // Parámetros del modal
  coleccion: string = '';
  columnas: string[] = [];
  tipos: Record<string, string> = {};
  referencias: Record<string, string> = {};
  modo: 'agregar' | 'editar' = 'agregar';
  documentoEditar: any = null;

  // Datos y opciones
  datos: Record<string, any> = {};
  opcionesReferencia: Record<string, any[]> = {};

  constructor(
    private fs: FirestoreService,
    public modalService: ModalService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.modalService.datos$.pipe(take(1)).subscribe(datos => {
      if (datos) {
        // Cargar datos del modal
        this.coleccion = datos.coleccion;
        const config = MODAL_CONFIGURACIONES[this.coleccion];
        if (config) {
          this.columnas = config.columnas;
          this.tipos = config.tipos;
          this.referencias = config.referencias || {};
        } else {
          console.warn('⚠️ No se encontró configuración para la colección:', this.coleccion);
          this.columnas = [];
          this.tipos = {};
          this.referencias = {};
        }
        this.modo = datos.modo;
        this.documentoEditar = datos.documentoEditar;

        console.log('🧩 Columnas recibidas:', this.columnas);

        // Si es edición, precargar datos
        if (this.modo === 'editar' && this.documentoEditar) {
          this.datos = { ...this.documentoEditar };
        } else {
          this.datos = {};
        }

        // Cargar referencias
        for (const campo in this.referencias) {
          const colRef = this.referencias[campo];
          this.fs.getAll(colRef).subscribe((docs) => {
            this.opcionesReferencia[campo] = docs;
          });
        }
      }
    });

  }

  guardar(): void {
    if (this.modo === 'agregar') {
      this.fs.add(this.coleccion, this.datos).then(() => {
      this.ui.mensaje('Documento agregado exitosamente');
      this.modalService.notificarRecarga();
      this.cerrar();
    }).catch(() => {
      this.ui.mensaje('Error al agregar documento', 'error');
    });

    } else if (this.modo === 'editar') {
      const id = this.datos['id'];
      const datosCopia = { ...this.datos };
      delete datosCopia['id'];

      this.fs.update(this.coleccion, id, datosCopia).then(() => {
        this.ui.mensaje('Documento actualizado');
        this.modalService.notificarRecarga();
        this.cerrar();
      }).catch(() => {
        this.ui.mensaje('Error al actualizar documento', 'error');
      });
    }
  }

  cerrar(): void {

    this.modalService.cerrar();
    this.datos = {};

  }

}
