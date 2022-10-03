import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { newEndereco, newProdutos, newUsuario } from 'src/app/common/factories';
import { Endereco } from 'src/app/Models/endereco';
import { Produto } from 'src/app/Models/produto';
import { Usuario } from 'src/app/Models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.page.html',
  styleUrls: ['./venda.page.scss'],
})
export class VendaPage implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.carregarEndereco();
  }

  ionViewWillEnter() {
    this.carregarUsuario();
    this.buscarProdutos();
    this.calcValorTotal();
  }

  usuario: Usuario = newUsuario();
  endereco: Endereco = newEndereco();
  produtos: Produto[] = newProdutos();
  valorTotal: number = 0;
  valor: string;


  carregarEndereco(){
    const endereco = JSON.parse(localStorage.getItem('endereco'));
    this.endereco = endereco;
  }

  carregarUsuario() {
    this.authService.carregarUsuario().subscribe({
      next: (res) => {
        console.log(res)
        this.usuario = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  buscarProdutos() {
    let storage = localStorage.getItem("produtos");
    this.produtos = JSON.parse(storage);
    console.log(this.produtos)
  }

  calcTotalItem(num: number, quantidade: number) {
    num *= quantidade;
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  }

  calcValorTotal() {
    this.valorTotal = 0;
    if (this.produtos) {
      for (var i = 0; i < this.produtos.length; i++) {
        this.valorTotal += this.produtos[i].preco * this.produtos[i].quantidade;
      }
    }

    this.valor = this.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  }

  voltar(){
    this.router.navigate(['/enderecos'])
  }

}
