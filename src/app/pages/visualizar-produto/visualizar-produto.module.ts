import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarProdutoPageRoutingModule } from './visualizar-produto-routing.module';

import { VisualizarProdutoPage } from './visualizar-produto.page';
import { MaterialDesignModule } from 'src/app/share/material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialDesignModule,
    VisualizarProdutoPageRoutingModule
  ],
  declarations: [VisualizarProdutoPage]
})
export class VisualizarProdutoPageModule {}
