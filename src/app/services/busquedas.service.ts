import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }  
  get headers() {
    return {
      headers: { 'q-token': this.token }
    }
  }
  constructor( private http: HttpClient ) { }

  private transformarUsuarios( results: any[] ): Usuario[] {
    return results.map(user => new Usuario(
      user.nombre, user.email, '', user.role, user.img, user.google, user.uid ));
  }

  buscar( tipo: 'usuarios'|'ornitologos'|'hospitales',
          termino: string ) {

    const url = `${ base_url }/buscar/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers ).pipe(
      map( (resp: any) => { 
         switch ( tipo ) {
          case 'usuarios':
            return this.transformarUsuarios( resp.resultados );
         
          default:
            return;
         }
    }));
  }
}
