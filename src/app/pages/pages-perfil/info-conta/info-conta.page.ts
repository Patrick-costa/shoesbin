import { Component, OnInit } from '@angular/core';
import { newUsuario } from 'src/app/common/factories';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-info-conta',
  templateUrl: './info-conta.page.html',
  styleUrls: ['./info-conta.page.scss'],
})
export class InfoContaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.carregarUsuario();
  }

  usuario: Usuario = newUsuario();

  carregarUsuario(){
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    this.usuario = usuario;
    console.log(usuario)
  }

}
