import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'refDisplay'
})
export class RefDisplayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
