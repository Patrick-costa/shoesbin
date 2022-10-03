import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { newProdutos } from 'src/app/common/factories';
import { Produto } from 'src/app/Models/produto';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit, OnDestroy {

  constructor(private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buscarProdutos();
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  ionViewWillEnter(): void {
    this.verificarParametrosUrl();
    this.definirFiltro();
    setTimeout(() => {
      this.retirarRegistrosRepetidos();
    }, 500);
  }

  escolhidos = {
    "marca": '',
    "cor": '',
    "tamanho": null,
    "categoria": ''
  }

  produtos: Produto[] = newProdutos();
  subs: Subscription[] = [];
  filtroMarca: string;
  filtroTamanho: number;
  filtroCor: string;
  filtroCategoria: string;
  marca = [];
  tamanho = [];
  categoria = [];
  cor = [];

  buscarProdutos(){
    this.apiService.buscarProdutos().then(resolve => {
      this.produtos = resolve;
    },
    error => console.log(error))
  }

  verificarParametrosUrl() {
    this.filtroMarca = this.activatedRoute.snapshot.queryParams['marca'];
    this.filtroTamanho = this.activatedRoute.snapshot.queryParams['tamanho'];
    this.filtroCor = this.activatedRoute.snapshot.queryParams['cor'];
    this.filtroCategoria = this.activatedRoute.snapshot.queryParams['categoria'];
  }

  filtrar() {
    this.router.navigate(['home'], {
      queryParams: {
        "marca": this.filtroMarca, "tamanho": this.filtroTamanho, "cor": this.filtroCor, "categoria": this.filtroCategoria
      }
    })
  }

  limparFiltro() {
    this.filtroCor = '';
    this.filtroMarca = '';
    this.filtroTamanho = null;
    this.filtroCategoria = '';
    this.escolhidos = {
      "marca": '',
      "cor": '',
      "tamanho": null,
      "categoria": '',
    }
  }

  excluirFiltro(item: any) {
    if (item == this.filtroMarca) {
      this.filtroMarca = '';
    } else if (item == this.filtroCor) {
      this.filtroCor = ''
    } else if (item == this.filtroTamanho) {
      this.filtroTamanho = null;
    } else if (item == this.filtroCategoria) {
      this.filtroCategoria = ''
    }
    this.escolhidos = {
      "marca": this.filtroMarca,
      "cor": this.filtroCor,
      "tamanho": this.filtroTamanho,
      "categoria": this.filtroCategoria
    }
  }

  definirMarca(item: string) {
    this.escolhidos.marca = item;
    this.filtroMarca = item;
  }

  definirCor(item: string) {
    this.filtroCor = item;
    this.escolhidos.cor = this.filtroCor;
  }

  definirTamanho(item: number) {
    this.filtroTamanho = item;
    this.escolhidos.tamanho = this.filtroTamanho;
  }

  definirCategoria(item: string) {
    this.filtroCategoria = item;
    this.escolhidos.categoria = this.filtroCategoria;
  }

  definirFiltro() {
    this.escolhidos = {
      "marca": this.filtroMarca,
      "cor": this.filtroCor,
      "tamanho": this.filtroTamanho,
      "categoria": this.filtroCategoria
    }
  }

  retirarRegistrosRepetidos() {
    for (var i = 0; i < this.produtos.length; i++) {
      this.marca[i] = this.produtos[i].marca;
      this.tamanho[i] = this.produtos[i].tamanho;
      this.categoria[i] = this.produtos[i].categoria;
      this.cor[i] = this.produtos[i].cor;
    }

    //Remover registros repetidos cor
    const set = new Set();
    const filtroCor = this.cor.filter(x => {
      const registroRepetido = set.has(x);
      set.add(x);
      return !registroRepetido;
    });
    this.cor = filtroCor;

    //Remover registros repetidos marca
    const filtroMarca = this.marca.filter(x => {
      const registroRepetido = set.has(x);
      set.add(x);
      return !registroRepetido;
    });
    this.marca = filtroMarca;

    //Remover registros repetidos categoria
    const filtroCategoria = this.categoria.filter(x => {
      const registroRepetido = set.has(x);
      set.add(x);
      return !registroRepetido;
    });
    this.categoria = filtroCategoria;

    //Remover registros repetidos tamanho
    const filtroTamanho = this.tamanho.filter(x => {
      const registroRepetido = set.has(x);
      set.add(x);
      return !registroRepetido;
    });
    this.tamanho = filtroTamanho;

    //Organizar tamanhos por ordem crescente
    this.tamanho.sort((a,b) => {
      if(a > b) return 1;
      if(a < b) return -1;
    })
  }
}
