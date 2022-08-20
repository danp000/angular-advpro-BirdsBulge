import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervSubs!: Subscription;

  constructor() {

    // this.retornaObs().pipe( retry(2) ).subscribe( 
    //   { 
    //      next: val => console.log('subs', val),
    //      error: err => console.warn('err', err),
    //      complete: () => console.info('Obs finished')
    //   }
    //  );

    this.intervSubs = this.retornaIntervalo().subscribe( console.log );

  }

  ngOnDestroy(): void {

    this.intervSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval( 250 ).pipe( 
      // take( 15 ),
      map( val => val + 1 ),
      filter( val => (val % 2 === 0) ? false : true
      ),
      
     );
  
  }

  retornaObs(): Observable<number> {

    let i = 0;
    
    return new Observable<number>( observer => {
      

      const interval = setInterval( () =>  {

        i++;
        observer.next(i);

        if ( i == 8 ) {
          clearInterval(interval);
          observer.complete();
        }

        if ( i == 4 ) {
          observer.error('i es a un valor mayor de 3');
        }

      }, 800 );

    });

  }

  ngOnInit(): void {
  }

}





