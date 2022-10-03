import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newEndereco, newGeolocation, newProdutos, newUsuario } from 'src/app/common/factories';
import { Endereco } from 'src/app/Models/endereco';
import { Produto } from 'src/app/Models/produto';
import { Usuario } from 'src/app/Models/usuario';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Location } from 'src/app/Models/geolocation';
import { StatusBar, Style, Animation } from '@capacitor/status-bar';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.page.html',
  styleUrls: ['./enderecos.page.scss'],
})
export class EnderecosPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {
    this.buscarUsuario();
    this.buscarProdutos();
    this.verificarGPSLigado();
    this.obterLocalizacao();
  }
  
  ionViewWillEnter(){
    this.alterarCorStatus();
  }

  usuario: Usuario = newUsuario();
  endereco: Endereco = newEndereco();
  produtos: Produto[] = newProdutos();
  valorTotal: number = 0;
  valor: string;
  idEndereco;
  enderecoAtual: Location = newGeolocation();
  geolocationBoolean: boolean = false;
  statusEndereco: boolean;

  buscarUsuario() {
    this.activatedRoute.data.subscribe({
      next: res => {
        this.usuario = res['usuario'];
        this.enderecoAtual = res['geolocation'];
        console.log(this.enderecoAtual);
        console.log(this.usuario);
      },
      error: (e) => console.log(e)
    })
  }


  voltar() {
    this.router.navigate(['/carrinho']);
  }

  async obterLocalizacao() {
    await Geolocation.requestPermissions()
    await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    }).then((resolve) => {
      this.converterLocalizacao(resolve.coords)
    })

  }

  converterLocalizacao(geolocation: any) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 2
    };
    this.nativeGeocoder.reverseGeocode(geolocation.latitude, geolocation.longitude, options).then(
      (result: NativeGeocoderResult[]) => {
        this.enderecoAtual = result[0];
        console.log(this.enderecoAtual);
        this.geolocationBoolean = true;
      }
    )
      .catch((error: any) => console.log(error));
  }

  async verificarGPSLigado() {
    try {
      console.log('funcionou')
      await Geolocation.checkPermissions().then((resolve) => {
        console.log(resolve);
      })
    } catch (e) {
      alert('Ligue o gps')
      this.router.navigate(['/carrinho'])
    }
  }


  marcarEndereco(endereco: Endereco, id: number) {
    if (this.idEndereco == id) {
      this.idEndereco = null
      this.endereco = newEndereco();
    } else {
      this.idEndereco = id;
      this.endereco = endereco;
    }
  }

  salvarEnderecoCompra() {
    localStorage.setItem('endereco', JSON.stringify(this.endereco))
    this.router.navigate(['/venda'])
  }

  converterGeolocationModelEndereco(): Endereco {
    return {
      bairro: this.enderecoAtual.subLocality,
      cep: this.enderecoAtual.postalCode,
      complemento: '',
      localidade: this.enderecoAtual.subAdministrativeArea,
      logradouro: this.enderecoAtual.thoroughfare,
      numero: parseInt(this.enderecoAtual.subThoroughfare),
      uf: this.enderecoAtual.administrativeArea
    }
  }

  buscarProdutos() {
    let storage = localStorage.getItem("produtos");
    this.produtos = JSON.parse(storage);
    this.calcValorTotal();
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

  async alterarCorStatus() {
    await StatusBar.setBackgroundColor({ color: '#E36C01' });
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.show({ animation: Animation.Slide });
  }

}
