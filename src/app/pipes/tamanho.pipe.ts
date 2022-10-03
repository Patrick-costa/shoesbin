import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tamanho'
})
export class TamanhoPipe implements PipeTransform {

  transform(value: Array<any>, filtro: number): any {
    if (filtro) {
      if(filtro == 0){
        return value
      }
      return value.filter(a =>
        a.tamanho.toString().toUpperCase().indexOf(filtro) >= 0
      );
    } else {
      // Quando filtro for vazio ou nulo,
      // retornamos o próprio array
      return value;
    }
  }
}