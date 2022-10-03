import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { newFavorito, newFavoritos, newProduto, newProdutos } from 'src/app/common/factories';
import { Favoritos } from 'src/app/Models/favoritos';
import { Produto } from 'src/app/Models/produto';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.page.html',
  styleUrls: ['./visualizar-produto.page.scss'],
})
export class VisualizarProdutoPage implements OnInit, OnDestroy {

  constructor(private service: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.capturarIdRota();
    this.capturarProduto();
    this.capturarProdutos();
    this.buscarFavorito();
  }
  
  ionViewDidEnter(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe);
  }


  id: any;
  produto: Produto = newProduto();
  produtos: Produto[] = newProdutos();
  produtosCores: Produto[];
  produtosTamanho: Produto[];
  quantidade = 1;
  itemCarrinho: Produto;
  favorito: Favoritos = newFavorito();
  favIcon = "star-outline"
  favoritos: Favoritos[] = newFavoritos();
  idProdutoFavorito: number;
  subs: Subscription[] = [];

  capturarIdRota() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  buscarFavorito(){
    this.activatedRoute.data.subscribe({
      next: (res) => {
        console.log(res);
        this.verificarProdutoFavorito(res['favorito']);
      }
    })
  }

  // buscarFavorito(){
  //   this.service.buscarFavorito(this.id).then(resolve => {
  //     console.log(resolve);
  //     this.verificarProdutoFavorito(resolve);
  //   })
  // }

  // capturarProduto() {
  //   this.service.buscarProduto(this.id).then(resolve => {
  //     this.produto = resolve;
  //   },
  //     error => console.log(error))
  // }

  capturarProduto(){
    this.activatedRoute.data.subscribe({
      next: (res) => {
        this.produto = res['produto']
      }
    })
  }

  capturarProdutos() {
    const produtosAPI = this.service.buscarProdutos();
    produtosAPI.then(resolve => {
      setTimeout(() => {
        this.procurarProdutosSimilares(resolve);
      }, 700);
    },
      error => {
        console.log(error)
      })
  }
  procurarProdutosSimilares(obj: any) {
    this.produtos = obj.filter(x => {
      return x.titulo == this.produto.titulo;
    });

    this.eliminarCoresRepetidas(this.produtos);
    this.eliminarTamanhosRepetidos(this.produtos);
  }

  eliminarCoresRepetidas(obj: any) {
    //Remover registros repetidos
    const set = new Set();
    const filtro = obj.filter(x => {
      const registroRepetido = set.has(x.hex);
      set.add(x.hex);
      return !registroRepetido;
    });
    this.produtosCores = filtro;
  }

  eliminarTamanhosRepetidos(obj: any) {
    //Remover registros repetidos
    const set = new Set();
    const filtro = obj.filter(x => {
      const registroRepetido = set.has(x.tamanho);
      set.add(x.tamanho);
      return !registroRepetido;
    });
    this.produtosTamanho = filtro;
  }

  adicionarPrecoAntigo(num) {
    const preco = num + 80;
    return preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  }
  substituirPontoFlutuante(num: number) {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  addQuantidade() {
    if (this.quantidade < this.produto.quantidade) {
      this.quantidade++;
    } else {

    }
  }

  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    } else {

    }
  }

  favoritar(id: number) {
    if (this.favIcon != 'star') {
      this.favIcon = "star";
      this.favorito.produto.id = id;
      this.toastControl("Adicionado aos favoritos", "warning")
      const sub = this.service.AddFavoritos(this.favorito).subscribe({
        next: (res) => console.log(res),
        error: (e) => console.log(e)
      });

      this.subs.push(sub);

    } else if (this.favIcon = 'star') {
      this.favIcon = "star-outline";
      this.toastControl("Removido dos favoritos", "warning")
      const sub = this.service.removerFavoritos(this.idProdutoFavorito).subscribe({
        next: (res) => console.log(res),
        error: (e) => console.log(e),
      });

      this.subs.push(sub);
    }
  }

  verificarProdutoFavorito(obj) {
    if(obj.length > 0){
      if(this.id == obj[0].produto.id){
        this.favIcon = "star";
        this.idProdutoFavorito = obj[0].id
      }
    }

  }

  adicionarCarrinho() {
    this.definirObjCarrinho();
    this.inserirProdutoStorage();
    this.toastControl("Produto adicionado ao carrinho", "success");

    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 500);
  }

  definirObjCarrinho() {
    let id = Date.now();
    return this.itemCarrinho = {
      titulo: this.produto.titulo,
      id: this.produto.id,
      categoria: this.produto.categoria,
      cor: this.produto.cor,
      descricao: this.produto.descricao,
      idStorage: id,
      data: this.produto.data,
      hex: this.produto.hex,
      imagem: this.produto.imagem,
      marca: this.produto.marca,
      preco: this.produto.preco,
      quantidade: this.quantidade,
      status: this.produto.status,
      tamanho: this.produto.tamanho,
      quantidadeComprada: this.produto.quantidadeComprada,
    }
  }

  inserirProdutoStorage() {
    let array = new Array();
    if (localStorage.hasOwnProperty("produtos")) {
      array = JSON.parse(localStorage.getItem("produtos"));
      array.push(this.itemCarrinho);
      localStorage.setItem("produtos", JSON.stringify(array))
    } else {
      array.push(this.itemCarrinho)
      localStorage.setItem("produtos", JSON.stringify(array))
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando, aguarde',
      duration: 1000,
    });

    loading.present();
  }

  async toastControl(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 400,
      color: color,
      cssClass: 'toast-color'
    });

   return toast.present();
  }

}
