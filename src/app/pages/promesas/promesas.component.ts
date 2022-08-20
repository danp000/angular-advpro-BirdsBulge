import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    this.getUsers().then( (users: any) => {
      console.log(users);
    });

    // const prom = new Promise( ( resolve, reject ) => {
    //   if ( false ) {
    //     resolve('resolve promise..');
    //   } else {
    //     reject( 'unresolved' );
    //   }
    // });
    // prom.then( ( msj ) => {
    //   console.log( msj );
    // }).catch( err => console.log('error in promise', err) );
    // console.log('Final');

  }

  getUsers() {

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users').then( resp =>
      resp.json() ).then( body => {

        resolve(body.data);
      });
      
    });
  }


}
