import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Produto } from '../Models/produto';
import { ApiService } from '../services/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoResolver implements Resolve<Produto[]> {
  constructor(private apiService: ApiService){

  }
  resolve(): Observable<Produto[]>  {
    return this.apiService.buscar().pipe(map((data: any) => {
      return data
    }))
  }
}
