import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../Models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: any){
   return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
