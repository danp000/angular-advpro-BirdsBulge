import { Component, OnInit } from '@angular/core';
import { GeneralService, SettingsService } from '../../services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
    `
      .img-circle {
        width: 55px;
        border-radius: 6px;
      }
    `,
  ],
})
export class SideBarComponent implements OnInit {

  menuOpts: any[] = [];

  constructor( private genServ: GeneralService,
               private sidServ: SettingsService ) {

                this.menuOpts = sidServ.menu;
               }

  ngOnInit(): void {
    this.genServ.getThemesLinks;
    this.genServ.checkTheme();
  }

  changeTheme( theme: string ) {
    this.genServ.changeTheme(theme);
  }
}
