import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credenciais } from '../Models/credenciais';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,
              private router: Router,
                ) { }

  authenticate(creds: Credenciais){
    return this.http.post(`${environment.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  carregarUsuario(){
    return this.http.get<Usuario>(`${environment.baseUrl}/usuarios/meuUsuario`);
  }

  buscarUsuarios(){
    return this.http.get<Usuario[]>(`${environment.baseUrl}/usuarios`);
  }

  criarUsuario(usuario: Usuario){
    return this.http.post(`${environment.baseUrl}/usuarios/cadastro`, usuario);
  }
  successfullLogin(authToken: any){
    localStorage.setItem('token', authToken)
  }

  isAuthenticated(){
    let token = localStorage.getItem('token');

    if(token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  atualizarUsuario(id: number, usuario: Usuario){
    return this.http.put(`${environment.baseUrl}/usuarios/${id}`, usuario);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('produtos');
    localStorage.removeItem('usuario');
    localStorage.removeItem('endereco')
    this.router.navigate(['login'])
  }
}
