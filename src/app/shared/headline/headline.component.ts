import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styles: [
    `
      .profile-pic {
        width: 55px;
        border-radius: 4px;
      }
      .img-circle {
        width: 50px;
        border-radius: 10px;
      }
    `,
  ],
})
export class HeadlineComponent {
  constructor( private usuServ: UsuarioService ) {}

  logout() {
    this.usuServ.logOut();
  }
  
}
