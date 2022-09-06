import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArchiveUploadService {

  public usuario!: Usuario;
  get uid(): string {
    return this.usuario.uid || '';
  }  
  get token(): string {
    return localStorage.getItem('token') || '';
  }  

  constructor( private http: HttpClient ) { }
  
  async cambiarImgUsuario( archivo: File,
         tipo: 'usuarios' | 'ornitologos' | 'hospitales', id: string )
   {  
    try {
      
      const url = `${ base_url }/subir/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: { 'q-token': this.token },
        body: formData
      } );

      const data = await resp.json();
      if ( data.ok ) {
        return data.nombreArch;  
      } else {
        console.log(data);
        return data;
      }

    } catch (error) {
      console.log(error);
      return error;
    }   
  }
}
