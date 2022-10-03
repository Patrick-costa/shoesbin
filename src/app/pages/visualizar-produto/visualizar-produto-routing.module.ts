import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarProdutoPage } from './visualizar-produto.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarProdutoPageRoutingModule {}
