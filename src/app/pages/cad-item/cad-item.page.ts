import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/Models/produto';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-cad-item',
  templateUrl: './cad-item.page.html',
  styleUrls: ['./cad-item.page.scss'],
})
export class CadItemPage implements OnInit {

  constructor(private http: HttpClient,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.testar();
  }

  model: Produto = {
    titulo: '',
    marca: '',
    tamanho: 0,
    preco: 0.0,
    descricao: '',
    categoria: '',
    imagem: '',
    status: true,
    quantidade: 10,
    cor: '',
    hex: '',
    quantidadeComprada: '0',
  }
  data = Date.now();
  fileSelected: any = null;


  testar() {
    this.http.get('https://app-shoesbin.herokuapp.com/produtos').subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e)
    })
  }

  teste(evt: any) {
    this.fileSelected = evt.target.files[0];
    console.log(this.fileSelected)
  }


  enviar() {

    this.http.post('http://localhost:9090/produtos', this.model).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e)
    })
  }

  submit() {

    this.model.imagem = "https://shoesbin.s3.sa-east-1.amazonaws.com/" + this.data + "_" + this.fileSelected.name;

    this.enviar();

    const file = this.fileSelected;

    this.uploadService.fileUpload(file, this.model.imagem);
  }




}
