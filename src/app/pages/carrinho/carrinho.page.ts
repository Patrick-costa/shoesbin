import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newProdutos } from 'src/app/common/factories';
import { Carrinho } from 'src/app/Models/carrinho';
import { Produto } from 'src/app/Models/produto';
import { ApiService } from 'src/app/services/api-service.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  constructor(private service: ApiService,
    private router: Router) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(): void {
    this.alterarCorStatus();
    this.avancoBoolean = false;
    this.buscarProdutos();
    this.calcValorTotal();
  }

  produtos: Produto[] = newProdutos();
  valorTotal: number = 0;
  valor: string;
  desconto: number = 0;
  carrinho: Carrinho;
  avancoBoolean = false;

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

  deletarItemCarrinho(id: number) {
    let array = new Array();
    array = JSON.parse(localStorage.getItem("produtos"));
    array = array.filter(x => {
      return x.idStorage != id;
    });
    localStorage.setItem("produtos", JSON.stringify(array));
    this.buscarProdutos();
  }

  addQuantidade(id: number) {
    let array = new Array();
    array = JSON.parse(localStorage.getItem("produtos"));
    array.forEach(x => {
      if (x.idStorage == id) {
        x.quantidade++
      }
    });
    localStorage.setItem("produtos", JSON.stringify(array));
    this.buscarProdutos();
    this.calcValorTotal();
    this.calcQuantidadeItens();
  }

  calcQuantidadeItens() {
    let qtdItens = 0;

    if (this.produtos) {
      for (var i = 0; i < this.produtos.length; i++) {
        qtdItens += this.produtos[i].quantidade;
      }
    }
    return qtdItens;
  }


  removerQuantidade(id: number) {
    let array = new Array();
    array = JSON.parse(localStorage.getItem("produtos"));
    array.forEach(x => {
      if (x.idStorage == id) {
        x.quantidade--;
        localStorage.setItem("produtos", JSON.stringify(array));
        this.buscarProdutos();
        if (x.quantidade < 1) {
          this.deletarItemCarrinho(id);
        }
      }
    });
    this.valorTotal = 0;
    this.calcValorTotal();
    this.calcQuantidadeItens();
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  avancarCompra() {
    if (this.produtos.length > 0) {
      this.avancoBoolean = true;
      this.router.navigate(['/enderecos'])
    } else {
      //EMITIR UM ALERTA
    }
  }

  async alterarCorStatus() {
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
    await StatusBar.setStyle({ style: Style.Light })
  }

}
