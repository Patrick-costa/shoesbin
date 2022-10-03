import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadItemPageRoutingModule } from './cad-item-routing.module';

import { CadItemPage } from './cad-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadItemPageRoutingModule
  ],
  declarations: [CadItemPage]
})
export class CadItemPageModule {}
