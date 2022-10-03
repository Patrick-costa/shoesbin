
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { slideInAnimation } from '../animation';
import { Produto } from '../Models/produto';
import { ApiService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    slideInAnimation
  ]
})
export class HomePage implements OnInit, OnDestroy {

  constructor(private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.alterarCorStatus();
  }

  ionViewWillEnter(): void {
    this.buscarProdutos();
    this.verificarParametrosUrl();
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  produtos: Produto[] = [];
  statusIcon: boolean = false;
  filtro: string;
  marca: string;
  tamanho: number
  cor: string;
  categoria: string;
  subs: Subscription[] = [];


  verificarParametrosUrl() {
    this.marca = this.activatedRoute.snapshot.queryParams['marca'];
    this.tamanho = this.activatedRoute.snapshot.queryParams['tamanho'];
    this.cor = this.activatedRoute.snapshot.queryParams['cor'];
    this.categoria = this.activatedRoute.snapshot.queryParams['categoria'];
  }

  acessarFiltro() {
    this.router.navigate(['/filtro'], { queryParams: { "marca": this.marca, "cor": this.cor, "categoria": this.categoria, "tamanho": this.tamanho } },)
  }


  // buscarProdutos(){
  //   this.apiService.buscarProdutos().then(resolve => {
  //     this.produtos = resolve;
  //     this.removerRegistrosRepetidos(this.produtos);
  //   },
  //   error => {
  //     console.log(error);
  //   })
  // }

  buscarProdutos() {
    this.activatedRoute.data.subscribe({
      next: (res) => {
        this.produtos = res['produtos']
        this.removerRegistrosRepetidos(this.produtos);
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  adicionarPrecoAntigo(num) {
    const preco = num + 80;
    return preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  }
  substituirPontoFlutuante(num: number) {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  }

  filtrarNome(evt: any) {
    this.filtro = evt.srcElement.value;
  }

  removerRegistrosRepetidos(obj: any) {
    if (this.marca != null && this.cor == null && this.categoria == null && this.tamanho == null) {
      const set = new Set();
      const filtro = this.produtos.filter(x => {
        const registroRepetido = set.has(x.titulo);
        set.add(x.titulo);
        return !registroRepetido;
      });
      this.produtos = filtro;
    } else {
      const set = new Set();
      const filtro = this.produtos.filter(x => {
        const registroRepetido = set.has(x.titulo);
        set.add(x.titulo);
        return !registroRepetido;
      });
      this.produtos = filtro;
    }
  }

  logout() {
    this.authService.logout()
  }

  async alterarCorStatus(){
    await StatusBar.setBackgroundColor({color: '#ffffff'});
    await StatusBar.setStyle({style: Style.Light})
  }

}
