import { inject, Pipe, PipeTransform } from '@angular/core';
import { getDoc, doc, Firestore, DocumentReference, DocumentData, docData } from '@angular/fire/firestore';
import { from, map, Observable, of, shareReplay, switchMap } from 'rxjs';


@Pipe({
  name: 'refDisplay'
})

export class RefDisplayPipe implements PipeTransform {

  private firestore = inject(Firestore);
  private cache = new Map<string, Observable<string>>();

  transform(id: any, coleccion: string, campo: string = 'nombre'): Observable<string> {
  if (!coleccion) return of('⚠️ Sin colección');

  // Si es un DocumentReference, obtén su id
  if (typeof id === 'object' && 'id' in id) {
    id = id.id;
  }

  if (typeof id !== 'string' || !id.trim()) {
    return of('⚠️ Ref. inválida');
  }
  // Validación robusta: id debe ser string no vacío
  if (typeof id !== 'string' || !id.trim()) {
    return of('⚠️ Ref. inválida');
  }

  const cacheKey = `${coleccion}/${id}/${campo}`;
  if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)!;

  const docRef = doc(this.firestore, coleccion, id);
  const observable$ = docData(docRef).pipe(
    map((data: any) => {
      console.log(`📦 RefDisplayPipe: [${coleccion}/${id}] Campo: ${campo}`, data);
      return data?.[campo] ?? '⚠️ Sin datos';
    }),
    shareReplay(1)
  );

  this.cache.set(cacheKey, observable$);
  return observable$;
}



}
