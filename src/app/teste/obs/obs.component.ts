import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.scss'],
})
export class ObsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.observable()
  }

  subject = new BehaviorSubject(undefined);
  teste;

  observable() {
    // const myObservable = of(1, 2, 3);

    // const myObserver = {
    //   next: (x: number) => console.log('Observer got a next value: ' + x),
    //   error: (err: Error) => console.error('Observer got an error: ' + err),
    //   complete: () => console.log('Observer got a complete notification'),
    // };

    // // Execute with the observer object
    // myObservable.subscribe(myObserver);

    //   this.subject.subscribe((x) => {
    //     this.teste = x;
    //   })

    //   console.log(this.subject)
    //   setTimeout(() => {
    //     this.alterarValorSubject()
    //   }, 1000);

    // }

    // alterarValorSubject(){
    //   setTimeout(() => {
    //     this.subject.next(12345);

    //   }, 4000);
    // }
  }

}
