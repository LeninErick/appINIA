import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UiService {

  private coleccionActiva$ = new BehaviorSubject<string | null>(null);
  private rutaActiva$ = new BehaviorSubject<string[]>([]);

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
  
}
