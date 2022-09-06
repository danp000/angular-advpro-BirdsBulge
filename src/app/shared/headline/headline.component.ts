import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styles: [
    `
      .profile-pic {
        min-width: 55px;
        max-width: 60px;
        min-height: 55px;
        max-height: 70px;
        border-radius: 4px;
      }
      .img-circle {
        width: 50px;
        border-radius: 10px;
      }
      .u-text {
        height: 120%;
      },
      .text-email {
        color: rgb(5, 10, 58);
        font-size: 13px;
      }
    `,
  ],
})
export class HeadlineComponent {

  public usuario!: Usuario;

  constructor( private usuServ: UsuarioService ) {
    this.usuario = usuServ.usuario;
  }

  logout() {
    this.usuServ.logOut();
  }
  
}
