import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendaPageRoutingModule } from './venda-routing.module';

import { VendaPage } from './venda.page';
import { MaterialDesignModule } from 'src/app/share/material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    VendaPageRoutingModule
  ],
  declarations: [VendaPage]
})
export class VendaPageModule {}
