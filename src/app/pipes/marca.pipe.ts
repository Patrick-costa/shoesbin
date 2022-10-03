import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marca'
})
export class MarcaPipe implements PipeTransform {

  transform(value: Array<any>, filtro: string): any {
    if (filtro) {
      filtro = filtro.toString().toUpperCase();

      return value.filter(a =>
        a.marca.toString().toUpperCase().indexOf(filtro) >= 0
      );
    } else {
      // Quando filtro for vazio ou nulo,
      // retornamos o próprio array
      return value;
    }
  }
}
