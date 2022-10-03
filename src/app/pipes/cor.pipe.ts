import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cor'
})
export class CorPipe implements PipeTransform {

  transform(value: Array<any>, filtro: string): any {
    if (filtro) {
      filtro = filtro.toUpperCase();

      return value.filter(a =>
        a.cor.toUpperCase().indexOf(filtro) >= 0
      );
    } else {
      // Quando filtro for vazio ou nulo,
      // retornamos o próprio array
      return value;
    }
  }
}

