import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { newGeolocation } from '../common/factories';
import { Location } from '../Models/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationResolver implements Resolve<Location> {
  constructor(private nativeGeocoder: NativeGeocoder, private router: Router) {

  }
  enderecoAtual: Location = newGeolocation();

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Location> {
    this.verificarGPSLigado();
    await Geolocation.requestPermissions()
    await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    }).then((resolve) => {
      this.converterLocalizacao(resolve.coords)
    })

    return this.enderecoAtual;
  }

  converterLocalizacao(geolocation: any) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 2
    };
    this.nativeGeocoder.reverseGeocode(geolocation.latitude, geolocation.longitude, options).then(
      (result: NativeGeocoderResult[]) => {
        this.enderecoAtual = result[0];
        console.log(this.enderecoAtual);
      }
    )
      .catch((error: any) => console.log(error));
  }

  async verificarGPSLigado() {
    try {
      console.log('funcionou')
      await Geolocation.checkPermissions().then((resolve) => {
        console.log(resolve);
      })
    } catch (e) {
      alert('Ligue o gps')
      window.location.reload()
    }
  }
}
