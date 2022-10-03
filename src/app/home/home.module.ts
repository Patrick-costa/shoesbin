import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NomePipe } from '../pipes/nome.pipe';
import { HomePageRoutingModule } from './home-routing.module';
import { CorPipe } from '../pipes/cor.pipe';
import { MarcaPipe } from '../pipes/marca.pipe';
import { TamanhoPipe } from '../pipes/tamanho.pipe';
import { CategoriaPipe } from '../pipes/categoria.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NomePipe, CorPipe, MarcaPipe, TamanhoPipe, CategoriaPipe]
})
export class HomePageModule {}
