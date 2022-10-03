import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecosPageRoutingModule } from './enderecos-routing.module';

import { EnderecosPage } from './enderecos.page';
import { MaterialDesignModule } from 'src/app/share/material-design/material-design.module';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialDesignModule,
    EnderecosPageRoutingModule
  ],
  declarations: [EnderecosPage],
  providers: [
    Geolocation,
    NativeGeocoder
  ]
})
export class EnderecosPageModule {}
