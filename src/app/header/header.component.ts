import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  secondesSub: Subscription;
  secondes: number;

  constructor() { }

  ngOnInit(): void {
    const salutation = new Observable((observer)=>{
      observer.next("Hello"); //next permettre d'émettre une données
      observer.next("World !");
      observer.complete();
    });

    const secondesObs = interval(1000); // fonction proposé par rxjs



    this.secondesSub = secondesObs.subscribe(
      (value: number) => {

        if(value > 0){
          this.secondes = value;
          //console.log(value);
        }

      }
    );
  }

  ngOnDestroy(){ // on se désabonne
    this.secondesSub.unsubscribe;
  }
}
