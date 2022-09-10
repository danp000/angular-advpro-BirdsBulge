import { Component } from '@angular/core';
import { ModalService } from 'src/app/services';
import { ArchiveUploadService } from '../../services/archive-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
    `
     img {
      max-width: 350px;
      max-height: 350px;
      margin-bottom: 10px;
      margin-top: 20px;
      border: 10px groove rgba(89, 248, 208, 0.308);
     }
     label {
      position: fixed;
      top: 55px;
     }
     .modal-body {
      height: 440px;
      margin-left: 70px;
     }
     .btn-file {
        margin-left: 20px;
        margin-top: 0px;
        margin-bottom: -10px;
     }
     .btn-file:hover {
      color: rgba(59, 247, 137, 0.74);
     }
     .modal-footer {
      margin-top: -20px;
     }
     .loading {
      position: absolute;
      bottom: 30px;
      right: 290px;
    }
    `
  ]
})
export class ModalImagenComponent {

  public archivoImg!: File;
  public viewImg!: string | ArrayBuffer;
  public noHayId!: string;

  constructor( public modServ: ModalService,
               public uplServ: ArchiveUploadService,
               ) {}

  cambiarImgPerfil( event: any ) {
    this.uplServ.cambiarImgPreview(event);
  }
  subirImagen() {
      if (this.modServ.sujeto) {
        this.uplServ.subirImagen( this.modServ.tipo ,this.modServ.sujeto);
      } else {
        this.noHayId = 'Id inexistente';
        console.log(this.noHayId);
      }
  }
  cerrarModal() {
    this.modServ.cerrarModal();
  }
}
