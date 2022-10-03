import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../Models/usuario';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver implements Resolve<Usuario> {

  constructor(private authService: AuthService){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
    return this.authService.carregarUsuario().pipe(
      map((resolve: any) => {
        return resolve
      })
    )
  }
}
