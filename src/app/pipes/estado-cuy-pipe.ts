import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoCuy'
})
export class EstadoCuyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
