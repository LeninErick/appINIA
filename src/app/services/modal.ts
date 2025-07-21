import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  
  private _datosModal = new BehaviorSubject<any>(null);
  datos$ = this._datosModal.asObservable();

  private _visible = new BehaviorSubject<boolean>(false);
  visible$ = this._visible.asObservable();

  private _refrescar = new BehaviorSubject<boolean>(false);
  refrescar$ = this._refrescar.asObservable();

  private abierto = signal(false);

  modalAbierto = this.abierto.asReadonly();

  abrir(datos: any) {
    console.log('📨 ModalService.abrir data:', datos);
    this._datosModal.next(datos);
    this._visible.next(true);
    this.abierto.set(true);
  }

  cerrar(refrescar = false) {
    this._visible.next(false);
    this._datosModal.next(null);
    if (refrescar) this._refrescar.next(true);
    this.abierto.set(false);
  }


  notificarRecarga() {
    this._refrescar.next(true);
  }

  
  
}
