import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/Models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
import { AlertController, ToastController } from '@ionic/angular';
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private service: AuthService,
    private router: Router,
    private toastController: ToastController,
    private faio: FingerprintAIO,
    private alertControl: AlertController
  ) { }

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  statusIconEmail: boolean = false;
  statusIconSenha: boolean = false;
  avancoBoolean = false;

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.authenticar();
    this.avancoBoolean = false;
  }

  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: (resposta) => {
        this.alerta();
        this.avancoBoolean = true;
        this.service.successfullLogin(resposta.headers.get('Authorization')?.substring(7));
        if(localStorage.hasOwnProperty('creds')){
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log(error);
        this.presentToast("Usuario ou senha incorretos!", "danger");
        this.creds.senha = '';
      }
    });
  }

  teste() {
    console.log("ok");
    this.logar();
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
    });
    await toast.present();
  }

   authenticar() {
    if (localStorage.hasOwnProperty('creds')) {
      this.faio.isAvailable().then(() => {
        this.faio.show({
          title: "Login via biometria",
        }).then((val) => {
          this.creds = JSON.parse(localStorage.getItem('creds'));
          this.logar();
        },
          (e) => {
            console.log(JSON.stringify(e))
          })
      }, (err) => {

      })
    }
  }

  logout() {
    this.service.logout();
  }

  async alerta() {
    if (!localStorage.hasOwnProperty('creds')) {
      const alert = await this.alertControl.create({
        header: 'Realizar proximo login via biometria?',
        mode: 'ios',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              this.presentToast("Logado com sucesso!", "success");
              this.router.navigate(['/home']);
            }
          },
          {
            text: 'Sim',
            handler: () => {
              localStorage.setItem('creds', JSON.stringify(this.creds));
              this.presentToast("Logado com sucesso!", "success");
              this.router.navigate(['/home']);
            }
          }
        ]
      });
      alert.present();
    }
  }

}