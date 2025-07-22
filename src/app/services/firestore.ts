import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(public ref: Firestore) {}

  private firestore = inject(Firestore);

  // 🔼 Agregar documento a colección
  add<T>(coleccion: string, data: T): Promise<void> {
    const ref = doc(this.firestore, coleccion, crypto.randomUUID());
    return setDoc(ref, data as any);
  }

  // 📥 Obtener todos los documentos de una colección
  getAll<T>(coleccion: string): Observable<T[]> {
    const ref = collection(this.firestore, coleccion);
    return collectionData(ref, { idField: 'id' }) as Observable<T[]>;
  }

  // 🔍 Obtener un solo documento por ID
  getById<T>(coleccion: string, id: string): Observable<T> {
    const ref = doc(this.firestore, coleccion, id);
    return docData(ref, { idField: 'id' }) as Observable<T>;
  }

  // ✏️ Actualizar documento
  update<T>(coleccion: string, id: string, data: Partial<T>): Promise<void> {
    const ref = doc(this.firestore, coleccion, id);
    return updateDoc(ref, data as any);
  }

  // ❌ Eliminar documento
  delete(coleccion: string, id: string): Promise<void> {
    const ref = doc(this.firestore, coleccion, id);
    return deleteDoc(ref);
  }

}
