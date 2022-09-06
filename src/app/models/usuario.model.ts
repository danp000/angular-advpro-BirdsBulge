import { environment } from '../../environments/environment';

const api_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: string,
    public img?: string,
    public google?: boolean, 
    public uid?: string
  ) {}

  get imagenUrl() {
    if ( this.img?.includes('https') ) {
      return this.img;
    }

    if ( this.img ) {
      return `${ api_url }/subir/usuarios/${ this.img }`;
    }
    return `${ api_url }/subir/usuarios/no-image`;
  }

}



