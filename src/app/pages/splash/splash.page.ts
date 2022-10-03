import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style, Animation } from '@capacitor/status-bar';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.alterarCorStatus();
    this.proximaPagina();
  }

  proximaPagina(){
    setTimeout(() => {
        this.router.navigate(['/home'])
    }, 1200);
  }

  async alterarCorStatus() {
    await StatusBar.setBackgroundColor({ color: '#E36C01' });
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.show({ animation: Animation.Slide });
  }

}
