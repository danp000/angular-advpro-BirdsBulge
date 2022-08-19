import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private linkTheme = document.querySelector('#theme');
  private links!: NodeListOf<Element>;

  get getThemesLinks() {
    return this.links = document.querySelectorAll('.selector');
  }

  constructor() {
    let theme = localStorage.getItem('theme');

    if ( theme === null ) {
      theme = './assets/css/colors/green.css';
    }
    this.linkTheme?.setAttribute('href', theme!);
  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url );

    this.checkTheme();

  }

  checkTheme() {

    this.links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const presentTheme = this.linkTheme?.getAttribute('href');
      
      if (btnThemeUrl === presentTheme) {
        elem.classList.add('working');
      }
    });

    
  }

}
