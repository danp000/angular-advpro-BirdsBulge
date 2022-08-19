import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( private genServ: GeneralService ) { }

  ngOnInit(): void {
    this.genServ.getThemesLinks;
    this.genServ.checkTheme();
  }

  changeTheme( theme: string ) {
    this.genServ.changeTheme(theme);
  }

 

}
