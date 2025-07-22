import { inject, Pipe, PipeTransform } from '@angular/core';
import { getDoc, doc, Firestore, DocumentReference, DocumentData, docData } from '@angular/fire/firestore';
import { from, map, Observable, of, shareReplay, switchMap } from 'rxjs';


@Pipe({
  name: 'refDisplay'
})



export class RefDisplayPipe implements PipeTransform {

  private firestore = inject(Firestore);
  private cache = new Map<string, Observable<string>>();

  transform(id: string, coleccion: string, campo: string = 'nombre'): Observable<string> {
    if (!id || !coleccion) return of('');

    const cacheKey = `${coleccion}/${id}/${campo}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)!;

    const docRef = doc(this.firestore, coleccion, id);
    const observable$ = docData(docRef).pipe(
      map((data: any) => {
        console.log(`📦 RefDisplayPipe: [${coleccion}/${id}] Campo: ${campo}`, data);
        return data?.[campo] ?? 'Desconocido';
      }),
      shareReplay(1)
    );

    this.cache.set(cacheKey, observable$);
    return observable$;
  }

}
