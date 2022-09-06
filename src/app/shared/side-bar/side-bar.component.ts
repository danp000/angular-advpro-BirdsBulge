import { Component, OnInit } from '@angular/core';
import { GeneralService, SettingsService, UsuarioService } from '../../services';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [`

    .img-circle {
      max-height: 40px;
      max-width: 40px;
    }
    .user-profile {
      margin-top: 5px;
    }
  `
  ],
})
export class SideBarComponent implements OnInit {

  menuOpts: any[] = [];
  public usuario!: Usuario;
  

  constructor( private genServ: GeneralService,
               private usuServ: UsuarioService,
               private sidServ: SettingsService ) {

                this.usuario = usuServ.usuario;
                this.menuOpts = sidServ.menu;
               }

  ngOnInit(): void {
    this.genServ.getThemesLinks;
    this.genServ.checkTheme();
  }

  logout() {
    this.usuServ.logOut();
  }

  changeTheme( theme: string ) {
    this.genServ.changeTheme(theme);
  }
}
