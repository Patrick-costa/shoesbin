import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadItemPage } from './cad-item.page';

const routes: Routes = [
  {
    path: '',
    component: CadItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadItemPageRoutingModule {}
