import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrinho } from '../Models/carrinho';
import { Favoritos } from '../Models/favoritos';
import { Produto } from '../Models/produto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // async buscarProduto(id: number){
  //   let produto: Produto;

  //   await this.http.get<Produto>(`${environment.baseUrl}/produtos/${id}`).toPromise().then(api => {
  //     produto = api;
  //   });

  //   return produto;
  // }

  buscarProduto(id: number) {
    return this.http.get<Produto>(`${environment.baseUrl}/produtos/${id}`);
  }

  async buscarProdutos() {
    const listaProdutos: Produto[] = [];
    await this.http.get<Produto[]>(`${environment.baseUrl}/produtos`).toPromise().then(api => {
      api.forEach(dado => {
        listaProdutos.push(dado);
      })
    });
    return listaProdutos;
  }

  buscar(): Observable<Produto[]> {
     return this.http.get<Produto[]>(`${environment.baseUrl}/produtos`)
  }

  AddFavoritos(obj: Favoritos) {
    return this.http.post(`${environment.baseUrl}/favoritos`, obj);
  }

  // async buscarFavoritos(){
  //   const listaFavoritos: Favoritos[] = [];
  //   await this.http.get<Favoritos[]>(`${environment.baseUrl}/favoritos`).toPromise().then(
  //     api => {
  //       api.forEach(dado => {
  //         listaFavoritos.push(dado)
  //       })
  //     }
  //   );
  //   return listaFavoritos;
  // }

  buscarFavoritos() {
    return this.http.get<Favoritos[]>(`${environment.baseUrl}/favoritos`)
  }

  buscarFavorito(id:number){
    return this.http.get<Favoritos[]>(`${environment.baseUrl}/favoritos/produto/${id}`)
  }

  // async buscarFavorito(id: number) {
  //   const listaFavoritos: Favoritos[] = [];
  //   await this.http.get<Favoritos[]>(`${environment.baseUrl}/favoritos/produto/${id}`).toPromise().then(
  //     api => {
  //       api.forEach(dado => {
  //         listaFavoritos.push(dado)
  //       })
  //     }
  //   );
  //   return listaFavoritos;
  // }

  removerFavoritos(id: number) {
    return this.http.delete(`${environment.baseUrl}/favoritos/${id}`);
  }

  criarCarrinho(obj: Carrinho) {
    return this.http.post(`${environment.baseUrl}/carrinho`, obj);
  }


}
