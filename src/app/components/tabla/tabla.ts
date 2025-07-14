import { Component, effect, inject, Input, signal, OnInit } from '@angular/core';
import { UiService } from '../../services/ui';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { collection, collectionData, Firestore, DocumentData } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tabla',
  imports: [CommonModule],
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

  datos: any[] = [];
  cargando = true;
  ordenColumna = '';
  ordenAscendente = true;

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

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.cargando = true;

    const ref = collection(this.firestore, this.coleccion);
    collectionData(ref, { idField: 'id' }).subscribe(data => {
      this.datos = data;
      this.cargando = false;
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

    this.datos.sort((a, b) => {
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
  }


  abrirModalAgregar() {
    console.log('🟢 Abrir modal de agregar');
    // Aquí se activará el componente modalAgregar
  }

  abrirModalFiltrar() {
    console.log('🟡 Abrir modal de filtrar');
    // Aquí se activará el componente modalFiltrar
  }

}