import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ArchiveUploadService implements OnInit {
  public sujeto!: Usuario | Hospital | Medico | undefined;
  public usuarioLogueado: Usuario | undefined;
  private _imgNueva!: String;
  public archivoImg!: File;
  private _viewImg!: string | ArrayBuffer;
  public loadingImg: boolean = false;

  get viewImg(): string | ArrayBuffer {
    return this._viewImg;
  }
  get imgNueva() {
    return this._imgNueva;
  }
  get uid(): string {
    return this.sujeto!.uid || '';
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  constructor( private usuServ: UsuarioService ) {
    this.usuarioLogueado = usuServ.usuario;
  }
  ngOnInit(): void {
  }

  async cambiarImgUsuario(
    archivo: File,
    tipo: 'usuarios' | 'ornitologos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${ base_url }/subir/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: { 'q-token': this.token },
        body: formData,
      });

      const data = await resp.json();
      if (data.ok) {
        return data.nombreArch;
      } else {
        // console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  cambiarImgPreview(event: any) {
    this.archivoImg = event.target.files[0];

    if ( !this.archivoImg ) {
      this._viewImg = '';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.archivoImg);
    reader.onloadend = () => {
      this._viewImg = reader.result!;
    };
  }

  subirImagen( tipo: 'usuarios'|'hospitales'|'ornitologos',
               suj?: Usuario | Hospital | Medico): any {
    let idDe = '';
    if ( suj ) {
      idDe = suj.uid!;
    } else {
      idDe = this.usuarioLogueado!.uid!;
    }
    this.loadingImg = true;
    setTimeout(() => {
      this.cambiarImgUsuario(this.archivoImg, tipo , idDe)
        .then((img) => {
          // console.log(img);
          if (!img.nombreArch && img.ok === false) {
           Swal.fire({
              title: '¡Aviso!',
              icon: 'warning',
              width: 394,
              heightAuto: false,
              text: img.msg,
              timer: 3500,
            });
            return img.msg;
          }
          if (this.usuarioLogueado && !suj) {
            this.usuarioLogueado.img = img;
          } else if ( suj ) {
            this.sujeto = suj;
            this.sujeto.img = img;
            this._imgNueva = img;
            this._viewImg = '';
          }
          Swal.fire(
            '^Guardado^',
            'Imagen de perfil cambiada con éxito',
            'success'
          );
          return this.loadingImg = false;
        })
        .catch((er) => {
          console.log(er);
          return Swal.fire(
            '¡Error!',
            'Sucedió un error imprevisto, intenta otra imagen..',
            'error'
          );
        });
    }, 200);
  }
  limpiarImg() {
    this._imgNueva = '';
    this.sujeto = undefined;
    this._viewImg = '';
  }
}
