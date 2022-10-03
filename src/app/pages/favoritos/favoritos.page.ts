import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { newFavoritos } from 'src/app/common/factories';
import { Favoritos } from 'src/app/Models/favoritos';
import { ApiService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  constructor(private service: ApiService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter(): void {
      this.buscarFavoritos();
  }



  favoritos: Favoritos[] = [];

  // buscarFavoritos(){
  //   this.service.buscarFavoritos().then(resolve => {
  //     this.favoritos = resolve;
  //   },
  //   error => {
  //     console.log(error);
  //   })
  // }

  buscarFavoritos(){
    this.activatedRoute.data.subscribe({
      next: (res: Favoritos[]) => {
        this.favoritos = res['favoritos']
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


  logout(){
    this.authService.logout()
  }


}
