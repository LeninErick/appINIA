import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UiService {

  private coleccionActiva$ = new BehaviorSubject<string | null>(null);
  private rutaActiva$ = new BehaviorSubject<string[]>([]);
  private idPadre$ = new BehaviorSubject<string | null>(null);


  setColeccion(nombre: string) {
    this.coleccionActiva$.next(nombre);
  }

  getColeccion() {
    return this.coleccionActiva$.asObservable();
  }

  getColeccionActual() {
    return this.coleccionActiva$.value;
  }

  setRuta(ruta: string[]) {
    this.rutaActiva$.next(ruta);
  }

  getRuta() {
    return this.rutaActiva$.asObservable();
  }

  getRutaActual() {
    return this.rutaActiva$.value;
  }

  setIdPadre(id: string) {
    this.idPadre$.next(id);
  }

  getIdPadre() {
    return this.idPadre$.asObservable();
  }

  getIdPadreActual() {
    return this.idPadre$.value;
  }

  mensaje(mensaje: string, tipo: 'info' | 'error' = 'info') {
    if (tipo === 'error') {
      alert(`❌ ${mensaje}`);
    } else {
      alert(`✅ ${mensaje}`);
    }
  }
  
}
