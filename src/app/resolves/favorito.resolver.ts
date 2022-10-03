import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Favoritos } from '../Models/favoritos';
import { ApiService } from '../services/api-service.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FavoritoResolver implements Resolve<Favoritos> {

  constructor(private apiService: ApiService){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Favoritos> {
    const id = route.params.id;
    return this.apiService.buscarFavorito(id).pipe(
      map((result: any) => {
        return result
      })
    )
  }
}
