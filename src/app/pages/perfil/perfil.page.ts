import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AlertController, ToastController } from '@ionic/angular';
import {decode} from "base64-arraybuffer";
import { newUsuario } from 'src/app/common/factories';
import { Usuario } from 'src/app/Models/usuario';
import { AuthService } from 'src/app/services/auth.service';

import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private domSanitizer: DomSanitizer,
    private uploadService: UploadService,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.carregarUsuario()
  }

  imagem: SafeResourceUrl;
  data = Date.now();
  blob;
  file;
  fotoDefinida: boolean = false;
  background = '';
  usuario: Usuario = newUsuario();

  async escolherFoto() {
    this.permissoes();

    const imagem = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      promptLabelPhoto: 'Esolher na galeria',
      promptLabelPicture: 'Tirar foto',
      quality: 90
    });

    this.fotoDefinida = true;

    // É necessário transformar em bob, para depois transformar em file para poder fazer upload
    this.transformarEmBlob(imagem);

    this.setarPreviaImagem();

    this.alertControl();
  }

  async permissoes(){
    await Camera.checkPermissions();
  }
  
  carregarUsuario(){
    this.authService.carregarUsuario().subscribe({
      next: (res) => {
        this.usuario = res;
        console.log(this.usuario);
        this.definirFotoPerfil(res);
      },
      error: (error) => console.log(error)
    })
  }

  definirFotoPerfil(obj: Usuario){
    if(!obj.imagemUrl){
      this.background = '/assets/img/avatar.svg';
    } else {
      this.background = obj.imagemUrl;
    }
  }

  transformarEmBlob(camera){
    this.blob = new Blob([new Uint8Array(decode(camera.base64String))], {
      type: `image/${camera.format}`
    })
  }

  transformarBlobEmFile(blob){
    let file = new File([this.blob],"perfil", {
      type: this.blob.type,
    });
    this.file = file;
    return file;
  }

  setarPreviaImagem(){
    //Para fazer a prévia, é necessário pegar o file e criar um novo blob para poder usar o domSanitizer e criar a previa da imagem
    let file = this.transformarBlobEmFile(this.blob);
    let blob = URL.createObjectURL(file);
    this.imagem = this.domSanitizer.bypassSecurityTrustResourceUrl(blob);
    this.background = blob;
    console.log(this.imagem)
  }

  uploadS3(file){
    let fileName = "https://shoesbin.s3.sa-east-1.amazonaws.com/" + this.data + "_" + file.name;

    this.uploadService.fileUpload(file, fileName);
    
    this.atualizarUsuario(fileName);
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  atualizarUsuario(fileName){
    this.usuario.imagemUrl = fileName;
    delete this.usuario.perfis;
    console.log(this.usuario)
    this.authService.atualizarUsuario(this.usuario.id, this.usuario).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e)
    }
    );
  }

  async alertControl(){
    const alert = await this.alertController.create({
      header: 'Deseja salvar a foto ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            this.background = '/assets/img/avatar.svg'
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.uploadS3(this.file);
            this.toastControl();
          }
        },
      ]
    });

    alert.present();
  }
  
  async toastControl(){
    const toast = await this.toastController.create({
      message: 'Foto salva com sucesso!',
      color: 'success',
      duration: 1000
    })
    toast.present();
  }

  acessarInfoConta(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.router.navigate(['/info-conta'])
  }


};
