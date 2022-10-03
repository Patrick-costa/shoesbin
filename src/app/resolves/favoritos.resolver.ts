import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Favoritos } from '../Models/favoritos';
import { ApiService } from '../services/api-service.service';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class FavoritosResolver implements Resolve<Favoritos[]> {

  constructor(private apiService: ApiService){

  }
  resolve(): Observable<Favoritos[]> {
    return this.apiService.buscarFavoritos().pipe(
      map((result) => {
        return result
      })
    )
  }
}
