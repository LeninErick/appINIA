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
import { ModalFiltrar } from '../modal-filtrar/modal-filtrar';
import { MODAL_CONFIGURACIONES } from '../../models/modal-configuraciones';
import { RefDisplayPipe } from '../../pipes/ref-display-pipe';


@Component({
  selector: 'app-tabla',
  imports: [CommonModule, ModalFormulario, ModalFiltrar, RefDisplayPipe],
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
  
  mostrarFiltro = false;
  columnaFiltrada: string = '';
  palabraClave: string = '';

  mostrarModalFiltro = false;
  registrosFiltrados: any[] = []; // lo que se muestra en la tabla
  filtroActivo = false;



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

    this.registrosFiltrados = this.datosOriginales;

  }

  coleccionesPorCampo: Record<string, string> = {
    idClie: 'CLIENTE',
    idPers: 'PERSONAL',
    idUsua: 'USUARIO',
    idRaza: 'RAZA',
    idPoza: 'POZA',
    idGalp: 'GALPON',
    idCuy: 'CUY',
    idCruz: 'CRUZAMIENTO',
    idCont: 'CONTROL',
    idCama: 'CAMADA',
    idVent: 'VENTA',
    idArbo: 'ARBOL',
    idTrat: 'TRATAMIENTO',
    idReti: 'RETIRO'
      // Agrega más si los necesitas
  };

campoPorColeccion: Record<string, string> = {
  USUARIO: 'nombUsua',
  PERSONAL: 'nombPers',
  CLIENTE: 'nombClie',
  RAZA: 'nombRaza',
  POZA: 'nombPoza',
  CUY: 'nombCuy',
  ARBOL: 'nombArbo',
  CRUZAMIENTO: 'nombCruz',
  GALPON: 'nombGalp',
  RETIRO: 'nombReti',
  TRATAMIENTO: 'nombTrat',
  VENTA: 'nombVent',
  CONTROL: 'nombCont',
  CAMADA: 'nombCama',
};

  esReferencia(campo: string): boolean {
    return Object.keys(this.coleccionesPorCampo).includes(campo);
  }

  obtenerColeccion(campo: string): string {
    return this.coleccionesPorCampo[campo];
  }

  obtenerCampo(campo: string): string {
    const col = this.obtenerColeccion(campo);
    return this.campoPorColeccion[col] || 'nombre';
  }

  get columnasVisibles(): string[] {
    return Object.keys(this.datosOriginales[0] || {}).filter(col => col !== 'otros' && col !== 'acciones');

  }

  filtrarTabla(event: { columna: string; palabra: string }) {
    const { columna, palabra } = event;

    if (!palabra || palabra.trim() === '') {
      // Forzar orden descendente por esa columna si no hay palabra clave
      this.filtroActivo = false;
      this.ordenColumna = columna;
      this.ordenAscendente = false;
      this.ordenarPor(columna);
      this.ui.mensaje(`Ordenado por ${columna} (descendente)`, 'info');
    } else {
      // Filtrar por coincidencia
      this.registrosFiltrados = this.datosOriginales.filter((registro: any) =>
        String(registro[columna] || '').toLowerCase().includes(palabra.toLowerCase())
      );
      this.datos$ = of(this.registrosFiltrados);
      this.filtroActivo = true;
      this.ui.mensaje(`Se encontraron ${this.registrosFiltrados.length} coincidencias`, 'info');
    }

    this.mostrarModalFiltro = false;
  }

  quitarFiltro() {
    this.filtroActivo = false;
    this.ordenColumna = '';
    this.palabraClave = '';
    this.columnaFiltrada = '';
    this.registrosFiltrados = this.datosOriginales;
    this.datos$ = of(this.datosOriginales); // 🔁 Volver a mostrar datos completos
    this.ui.mensaje('Filtro eliminado. Tabla restaurada.', 'info');
  }

  obtenerDatos(coleccion: string) {
    this.cargando = true;
    this.fs.getAll<any>(coleccion).subscribe({
      next: data => {
        this.datosOriginales = data;
        this.datos$ = of(data);
        this.cargando = false;

        // ⚠️ Fuerza reinicio de columnas al cambiar colección
        const claves = data.length ? Object.keys(data[0]).filter(k => k !== 'id') : [];
        this.columnas = claves.slice(0, 4);

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
    this.ordenAscendente = this.filtroActivo ? false : true;
  }

  // 👇 Usar datos actuales dependiendo si hay filtro activo
  const base = this.filtroActivo ? this.registrosFiltrados : this.datosOriginales;

  const datosOrdenados = [...base].sort((a, b) => {
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

  // 🔁 Actualizar ambos si no hay filtro, solo uno si sí
  if (this.filtroActivo) {
    this.registrosFiltrados = datosOrdenados;
  }

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
    if (!this.datosOriginales.length) {
      this.ui.mensaje('Aún no se han cargado los datos.', 'info');
      return;
    }

    this.mostrarModalFiltro = true;
  }

  /*
  aplicarFiltro(columna: string, palabra: string) {
    this.columnaFiltrada = columna;
    this.palabraClave = palabra;

    const filtrados = this.datosOriginales.filter(d =>
      String(d[columna] ?? '').toLowerCase().includes(palabra.toLowerCase())
    );

    this.datos$ = of(filtrados);
    this.mostrarFiltro = false;

    if (filtrados.length === 0) {
      this.ui.mensaje('No se encontraron coincidencias', 'info');
    } else {
      this.ui.mensaje(`Se encontraron ${filtrados.length} coincidencias`, 'info');
    }
  }
  */

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