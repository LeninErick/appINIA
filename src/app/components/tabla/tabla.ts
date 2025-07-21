import { Component, effect, inject, Input, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { UiService } from '../../services/ui';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { collection, collectionData, Firestore, DocumentData } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { catchError, Observable, of, tap } from 'rxjs';
import { FirestoreService } from '../../services/firestore';
import { ModalService } from '../../services/modal';
import { ModalFormulario } from '../modal-formulario/modal-formulario';



@Component({
  selector: 'app-tabla',
  imports: [CommonModule, ModalFormulario],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})

export class Tabla implements OnInit {

  @Input() coleccion: string = '';                    // Ej. "CUY"
  @Input() columnas: string[] = [];                   // Ej. ['nombCuy', 'sexoCuy']
  @Input() dependiente: boolean = false;              // Si es subcolección
  @Input() subcolecciones: string[] = [];             // Ej. ['CONTROL', 'VENTA']

  private ui = inject(UiService);
  private firestore = inject(Firestore);
  private fs = inject(FirestoreService);
  public modal = inject(ModalService);

  datos$: Observable<any[]> = of([]);
  datosOriginales: any[] = [];
  cargando = true;
  ordenColumna = '';
  ordenAscendente = true;

  coleccionActiva = signal<string | null>(null);

  constructor(private cdr: ChangeDetectorRef) {

    this.ui.getColeccion().subscribe(nombre => {
      if (nombre) {
        this.cargando = true;
        this.coleccionActiva.set(nombre);
        this.obtenerDatos(nombre);
      }
    });

    this.fs.getAll<any>('CUY').subscribe(console.log);

    this.modal.refrescar$.subscribe(refrescar => {
      if (refrescar) {
        const coleccion = this.ui.getColeccionActual();
        if (coleccion) {
          console.log('🔄 Refrescando datos de', coleccion);
          this.obtenerDatos(coleccion);
        }
      }
    });

  }

  ngOnInit() {
    const coleccion = this.ui.getColeccionActual(); // o usa this.coleccion si ya está seteada
    if (coleccion) {
      this.obtenerDatos(coleccion);
    }

  }

  obtenerDatos(coleccion: string) {
    this.cargando = true;
    this.fs.getAll<any>(coleccion).subscribe({
      next: data => {
        this.datosOriginales = data;
        this.datos$ = of(data);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.ui.mensaje('Error al cargar datos', 'error');
        console.error(err);
        this.datos$ = of([]);
        this.cargando = false;
      }
    });
  }


  seleccionarSubcoleccion(idPadre: string, nombreSub: string) {
    const nuevaRuta = [...this.ui.getRutaActual(), nombreSub];
    this.ui.setRuta(nuevaRuta); // CUY > CONTROL, por ejemplo
    this.ui.setColeccion(nombreSub);
    this.ui.setIdPadre(idPadre); // Para saber en qué documento buscar la subcolección
  }

  formatear(valor: any): string {
    if (valor?.seconds) {
      const date = new Date(valor.seconds * 1000);
      return date.toLocaleDateString();
    }

    if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';
    if (typeof valor === 'object') return '[referencia]';

    return String(valor);
  }

  ordenarPor(columna: string) {
    if (this.ordenColumna === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenColumna = columna;
      this.ordenAscendente = true;
    }

    const datosOrdenados = [...this.datosOriginales].sort((a, b) => {

      const valorA = a[columna];
      const valorB = b[columna];

      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.ordenAscendente ? valorA - valorB : valorB - valorA;
      }

      const textoA = String(valorA).toLowerCase();
      const textoB = String(valorB).toLowerCase();

      return this.ordenAscendente
        ? textoA.localeCompare(textoB)
        : textoB.localeCompare(textoA);
    });

    this.datos$ = of(datosOrdenados);
  }

  abrirModalAgregar() {
    const coleccion = this.coleccionActiva(); // o simplemente this.coleccion si lo prefieres
    if (!coleccion) return;

    console.log('🟢 Abrir modal de agregar');
    console.log('🟢 Columnas que se envían al modal:', this.columnas);
    this.modal.abrir({
      modo: 'agregar',
      coleccion
    });
  }

  abrirModalFiltrar() {
    console.log('🟡 Abrir modal de filtrar');
    this.ui.mensaje('Error al guardar', 'error');
    this.modal.cerrar(false);
  }

  abrirModalEditar(documento: any) {
    const coleccion = this.coleccionActiva();
    if (!coleccion) return;

    console.log('🟠 Abrir modal de editar', documento);
    
    this.modal.abrir({
      modo: 'editar',
      coleccion,
      documentoEditar: documento
    });
  }

  eliminar(documento: any) {
    const coleccion = this.coleccionActiva();
    if (!coleccion || !documento.id) return;

    const confirmar = confirm(`¿Estás seguro de eliminar este registro de ${coleccion}?`);
    if (!confirmar) return;

    this.fs.delete(coleccion, documento.id).then(() => {
      this.ui.mensaje('Documento eliminado correctamente', 'info');
      this.obtenerDatos(coleccion); // refrescar tabla
    }).catch(err => {
      this.ui.mensaje('Error al eliminar el documento', 'error');
      console.error(err);
    });
  }


}