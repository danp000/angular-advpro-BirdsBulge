import { Injectable, Type } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { ArchiveUploadService } from './archive-upload.service';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;
  private _sujeto!: Usuario | Hospital | Usuario | undefined; 
  public img!: string;
  public id!: string;
  public tipo!: 'usuarios'| 'hospitales' | 'ornitologos';

  get ocultarModal() {
    return this._ocultarModal;
  }
  get sujeto() {
    return this._sujeto;
  }

  constructor( private uplServ: ArchiveUploadService ) { }

  abrirModal( tipo: 'usuarios' | 'ornitologos' | 'hospitales',
              suj: Usuario | Hospital | Medico ) {
    this.tipo = tipo;
    this.id = suj.uid!;     
    this._sujeto = suj;     
    if( suj.img?.includes('https') ) {
      this.img = suj.img;
    } else {
      this.img = `${ base_url }/subir/${ tipo }/${ suj.img }`;
    }
    this.uplServ.limpiarImg();
    this._ocultarModal = false;
  }
  cerrarModal() {
    this.uplServ.limpiarImg();
    this._ocultarModal = true;
  }
}
