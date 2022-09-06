import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, tap, Observable, catchError, of } from 'rxjs';

import { LoginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;
  public patronEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor( private http: HttpClient,
               private ngZone: NgZone,
               private router: Router ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }  
  get uid(): string {
    return this.usuario.uid || '';
  }         

  logOut() {
    localStorage.removeItem('token');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renovar`, {
        headers: { 'q-token': this.token }
    }).pipe( map( (resp: any) => {
           const { email, google, nombre, role, img, uid } = 
                resp.usuario;
           this.usuario = new Usuario
                ( nombre, email, '', role, img, google, uid );

           localStorage.setItem('token', resp.token); 
           return true;
      }), catchError( () => of(false) ));
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe( tap( (resp: any) => {
                localStorage.setItem('token', resp.token); }));
  }

  actualizarPerfil( data: { email?: string, nombre?: string,
                     role?: string, password?: string } ) {
                   
    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, {
           headers: { 'q-token': this.token }
    });
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
