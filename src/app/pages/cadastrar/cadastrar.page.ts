import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Endereco } from 'src/app/Models/endereco';
import { Usuario } from 'src/app/Models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Keyboard } from '@capacitor/keyboard';
import { newUsuario } from 'src/app/common/factories';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  providers: [
    CpfPipe
  ]
})
export class CadastrarPage implements OnInit {

  constructor(private enderecoService: EnderecoService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private ToastControll: ToastController,
    private cpfPipe: CpfPipe) { }

  ngOnInit() {
    this.criarFormulario();
  }

  @ViewChild("cep", { static: true })
  cep: ElementRef;

  endereco: Endereco[];
  formulario: FormGroup;
  usuario: Usuario = newUsuario();



  cadastrar() {
    this.pegarValorInput();
    if(this.checarSenha()){
      console.log(this.usuario);
      this.authService.criarUsuario(this.usuario).subscribe({
        next: (res) => {
          this.toast('success', 'Cadastrado com sucesso!'),
          this.router.navigate(['/login'])
        },
        error: (e) => this.alerta("Erro nos campos")
      })
    } else {
      this.alerta("Senhas não conferem");
      this.formulario.patchValue({
        senha: "",
        confirmarSenha: "",
      })
    }

  }

  pegarValorInput() {
    this.usuario = {
      nome: this.formulario.get('nome').value,
      cpf: this.formulario.get('cpf').value,
      email: this.formulario.get('email').value,
      senha: this.formulario.get('senha').value,
      telefone: this.formulario.get('telefone').value,
      endereco: [
        {
          cep: this.formulario.get('cep').value,
          logradouro: this.formulario.get('logradouro').value,
          bairro: this.formulario.get('bairro').value,
          localidade: this.formulario.get('localidade').value,
          complemento: this.formulario.get('complemento').value,
          numero: this.formulario.get('numero').value,
          uf: this.formulario.get('uf').value
        }
      ],

    }
  }

  buscarCep() {
    const cep = this.cep.nativeElement.value;
    this.enderecoService.buscarEndereco(cep).subscribe({
      next: (res) => this.definirValoresEndereco(res),
      error: (e) => {
        this.alerta("CEP informado é inválido");
        this.redefinirValoresEndereco();

      }

    })
  }

  definirValoresEndereco(obj: any) {
    return this.formulario.patchValue({
      logradouro: obj.logradouro,
      bairro: obj.bairro,
      localidade: obj.localidade,
      uf: obj.uf
    })
  }

  redefinirValoresEndereco() {
    return this.formulario.patchValue({
      cep: null,
      logradouro: null,
      bairro: null,
      localidade: null,
      uf: null
    })
  }

  criarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    })
  }

  async alerta(message: string) {
    const toast = await this.toastController.create(
      {
        duration: 2000,
        message: message,
        color: "danger"
      }
    );
    toast.present();
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  checarSenha() {
    let senha = this.formulario.get("senha").value;
    let confirmarSenha = this.formulario.get("confirmarSenha").value;

    return senha === confirmarSenha ? true : false;
  }

  async toast(tema, message){
    const toast = await this.ToastControll.create({
      message: message,
      color: tema,
      duration: 1500,
    });
    toast.present();
  }


}
