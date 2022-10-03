import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';

import { CpfPipe } from '../../pipes/cpf.pipe';

import { NgxMaskModule, IConfig } from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CadastrarPageRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [CadastrarPage, CpfPipe]
})
export class CadastrarPageModule {}
