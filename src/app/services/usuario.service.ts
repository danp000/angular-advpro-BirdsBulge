import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, tap, Observable, catchError, of } from 'rxjs';

import { LoginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario!: Usuario;
  public patronEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor( private http: HttpClient,
               private ngZone: NgZone,
               private router: Router ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get usuario(): Usuario {
    return this._usuario;
  }  
  get uid(): string {
    return this.usuario.uid || '';
  }
  get headers() {
    return {
      headers: { 'q-token': this.token }
    }
  }         

  logOut() {
    localStorage.removeItem('token');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renovar`, this.headers).pipe( map( (resp: any) => {
           const { email, google, nombre, role, img, uid } = 
                resp.usuario;
           this._usuario = new Usuario
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
                     role?: string, password?: string }){               
    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, this.headers);
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

  cargarUsuarios( desde: number = 0 ) {
      const url = `${ base_url }/usuarios?desde=${ desde }`;
      return this.http.get<CargarUsuarios>( url, this.headers ).pipe(
         map( (resp: CargarUsuarios) => {

        const usuarios = resp.usuarios.map( user => new Usuario(
          user.nombre, user.email, '', user.role, user.img, user.google, user.uid ));
        
        return { usuarios, total: resp.total };    
    }));
  }

  borrarUsuario( usuario: Usuario ) {
    const url = `${base_url}/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers ).pipe(
      map( (resp: any) => { 
        console.log(resp);
        return resp }
    ));
  }

  guardarUsuario( data: Usuario ) {               
    return this.http.put( `${ base_url }/usuarios/${ data.uid }`,
            data, this.headers);
  }
}
