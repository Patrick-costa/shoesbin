import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoContaPageRoutingModule } from './info-conta-routing.module';

import { InfoContaPage } from './info-conta.page';

import { CelPipe } from '../../../pipes/cel.pipe';
import { CpfPipe } from '../../../pipes/cpf.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoContaPageRoutingModule
  ],
  declarations: [InfoContaPage, CelPipe, CpfPipe]
})
export class InfoContaPageModule {}
