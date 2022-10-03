import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nome'
})
export class NomePipe implements PipeTransform {

  transform(value: Array<any>, filtro: string): any {
    if (filtro) {
      filtro = filtro.toUpperCase();

      return value.filter(a =>
        a.titulo.toUpperCase().indexOf(filtro) >= 0
      );
    } else {
      // Quando filtro for vazio ou nulo,
      // retornamos o próprio array
      return value;
    }
  }
}