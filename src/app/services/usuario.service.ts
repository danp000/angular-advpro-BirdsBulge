import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, tap, Observable, catchError, of } from 'rxjs';

import { LoginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public gapi: any;

  constructor( private http: HttpClient,
               private ngZone: NgZone,
               private router: Router ) { 
    }

  googleInit() {
    // this.gapi.load('auth2', () => {
    //   this.auth2 = this.gapi.auth2.init({
    //     cliend_id: '9185816974-4dll97ful1ldtlhktlhve5bbtng840qf.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin'
    //   });
    // });
  }             

  logOut() {
    localStorage.removeItem('token');
    // this.auth2.signOut().then( () => {
    //   this.router.navigateByUrl('/login');
    // });
    google.accounts.id.revoke( 'stupineancristiandaniel@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    } );
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renovar`, {
      headers: { 'q-token': token }
    }).pipe( tap( (resp: any) => {
              localStorage.setItem('token', resp.token); 
      }), map( resp => true ),
          catchError( err => of(false) ));
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe( tap( (resp: any) => {
                localStorage.setItem('token', resp.token); }));
  }

  login( formData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, formData )
                .pipe( tap( (resp: any) => {
                   localStorage.setItem('token', resp.token); }));
  }

  loginGoogle( token: string ) {
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe( tap( (resp: any) => {
                  localStorage.setItem('token', resp.token);
                } ) );
  }
}
