import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Produto } from '../Models/produto';
import { ApiService } from '../services/api-service.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VisualizarProdutoResolver implements Resolve<Produto> {
  constructor(private apiService: ApiService){}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Produto> {
    const id = route.params.id;
    return this.apiService.buscarProduto(id).pipe(map((result: any) => {
      return result
    }))
  }
}
